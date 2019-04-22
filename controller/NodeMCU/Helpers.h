#pragma once

#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino

#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager

#include <ArduinoJson.h>          //https://github.com/bblanchon/ArduinoJson //Using version 5.x
#include <SoftwareSerial.h>

//flag for saving data
bool shouldSaveConfig = false;
String ConfigCardID = "C5-C5-CF-65";


//callback notifying us of the need to save config
void saveConfigCallback () {
  Serial.println("Should save config");
  shouldSaveConfig = true;
}

void SetupWifiManager(char* room_name, char* server_url){
  //clean FS, for testing
  //SPIFFS.format();
  
  //read configuration from FS json
  Serial.println("mounting FS...");

  if (SPIFFS.begin()) {
    Serial.println("mounted file system");
    FSInfo fs_info;
    SPIFFS.info(fs_info);
    Serial.println(fs_info.totalBytes);
    if (SPIFFS.exists("/config.json")) {
      //file exists, reading and loading
      Serial.println("reading config file");
      File configFile = SPIFFS.open("/config.json", "r");
      if (configFile) {
        Serial.println("opened config file");
        size_t size = configFile.size();
        // Allocate a buffer to store contents of the file.
        Serial.println(String("File size: %d") + String(size));
        std::unique_ptr<char[]> buf(new char[size]);

        configFile.readBytes(buf.get(), size);
        DynamicJsonBuffer jsonBuffer;
        JsonObject& json = jsonBuffer.parseObject(buf.get());
        json.printTo(Serial);
        if (json.success()) {
          Serial.println("\nparsed json");

          strcpy(room_name, json["room_name"]);
          strcpy(server_url, json["server_url"]);

          json.prettyPrintTo(Serial);
        } else {
          Serial.println("failed to load json config");
        }
        configFile.close();
      }
    }
  } else {
    Serial.println("failed to mount FS");
  }
  //end read



  // The extra parameters to be configured (can be either global or just in the setup)
  // After connecting, parameter.getValue() will get you the configured value
  // id/name placeholder/prompt default length
  WiFiManagerParameter room_name_param("room_name", "Room Name", room_name, 128);
  WiFiManagerParameter server_url_param("server_url", "Server Url", server_url, 128);

  //WiFiManager
  //Local intialization. Once its business is done, there is no need to keep it around
  WiFiManager wifiManager;

  //set config save notify callback
  wifiManager.setSaveConfigCallback(saveConfigCallback);

  //add all your parameters here
  wifiManager.addParameter(&room_name_param);
  wifiManager.addParameter(&server_url_param);

  //reset settings - for testing
  //wifiManager.resetSettings();
  
  //sets timeout until configuration portal gets turned off
  //useful to make it all retry or go to sleep
  //in seconds
  //wifiManager.setTimeout(120);

  //fetches ssid and pass and tries to connect
  //if it does not connect it starts an access point with the specified name and default password
  //and goes into a blocking loop awaiting configuration
  if (!wifiManager.autoConnect("AccessWolfPrototype", "administrator")) {
    Serial.println("failed to connect and hit timeout");
    delay(3000);
    //reset and try again, or maybe put it to deep sleep
    ESP.reset();
    delay(5000);
  }

  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");

  //read updated parameters
  strcpy(room_name, room_name_param.getValue());
  strcpy(server_url, server_url_param.getValue());

  //save the custom parameters to FS
  if (shouldSaveConfig) {
    Serial.println("saving config");
    DynamicJsonBuffer jsonBuffer;
    JsonObject& json = jsonBuffer.createObject();
    json["room_name"] = room_name;
    json["server_url"] = server_url;

    File configFile = SPIFFS.open("/config.json", "w");
    if (!configFile) {
      Serial.println("failed to open config file for writing");
    }

    Serial.println("Got following data, attepting to save to fs:");
    json.printTo(Serial);
    json.printTo(configFile);
    configFile.close();
    //end save
  }

  Serial.println("local ip");
  Serial.println(WiFi.localIP());
}

#define SS_PIN 4  //D2
#define RST_PIN 5 //D1

#include <SPI.h>
#include <MFRC522.h>

int ReaderTimeOutUntil;
bool CanRead;

int SetupRFIDReader(MFRC522* reader){
  Serial.println("Setup Reader");
  SPI.begin();      // Initiate  SPI bus
  reader->PCD_Init();   // Initiate MFRC522
  return 0;
}

bool ReadRFIDCard(MFRC522* reader, String* card_id){
  if ( ! reader->PICC_IsNewCardPresent()) 
  {
    return false;
  }
  // Select one of the cards
  if ( ! reader->PICC_ReadCardSerial()) 
  {
    return false;
  }

  if(!CanRead){
    if(ReaderTimeOutUntil < millis()){
      CanRead = true;
    }else {
      return false;
    }
  }
  
  //Show UID on serial monitor
  Serial.println();
  Serial.print(" UID tag :");
  *card_id = "";
  byte letter;
  for (byte i = 0; i < reader->uid.size; i++) 
  {
     //Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     //Serial.print(mfrc522.uid.uidByte[i], HEX);
     card_id->concat(String(reader->uid.uidByte[i] < 0x10 ? " 0" : "-"));
     card_id->concat(String(reader->uid.uidByte[i], HEX));
  }
  card_id->remove(0, 1);
  card_id->toUpperCase();

  if(*card_id == ConfigCardID){
    WiFi.disconnect();//erases ssid and password and forces config mode.
    ESP.reset();
    delay(1000);
  }
  
  CanRead = false;
  ReaderTimeOutUntil = millis() + 1500;
  
  return true;
}

#define BUZZER_PIN D8

bool isBuzzing = false;
int BuzzUntil = 0;

void StartBuzzing(int frequency){
  isBuzzing = true;
  tone(BUZZER_PIN, frequency);
}

void StopBuzzing(){
  isBuzzing = false;
  noTone(BUZZER_PIN);
}

void Buzz(){
  if(isBuzzing){
    if(BuzzUntil < millis()){
      StopBuzzing();
    }
  }
}

void ActivateBuzzer(int code){
  if(code == 0){
    if(!isBuzzing){
      BuzzUntil = millis() + 1000; //Buz for 1 second
      StartBuzzing(800);
    }
  } else if(code == 1){
    if(!isBuzzing){
      BuzzUntil = millis() + 300; //Buz for 1 second
      StartBuzzing(2000);
    }
  }
}


String UrlBuilder(char* server_ip, char* room_name, String* card_uid){
  String URL = "";
  URL.concat(String("http://"));
  URL.concat(String(server_ip));
  URL.concat(String("/api/check_in/"));
  URL += *card_uid;
  URL.concat(String("/room/"));
  URL.concat(String(room_name));
  URL.concat(String("/"));
  Serial.println("URL IS:");
  Serial.println(URL);
  return URL;
}

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

int SendPostTo(String URL){
  HTTPClient http;    //Declare object of class HTTPClient
  http.begin(URL);
  
  return http.POST("");
}
