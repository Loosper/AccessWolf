#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <SPI.h>
#include <MFRC522.h>

#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <FS.h>

#include <ArduinoJson.h>

#define SS_PIN D8
#define RST_PIN D2

String server_ip;
int room;

const int TRIGGER_PIN = D3;
const int BUZZER_PIN = D0;
const int GREEN_LED_PIN = D4;

const char* CONFIG_FILE = "/config.json";

bool readConfigFile();
bool writeConfigFile();


MFRC522 rfid(SS_PIN, RST_PIN); 

MFRC522::MIFARE_Key key; 

byte nuidPICC[4];
 
void setup () {
  SPIFFS.begin();
 
  Serial.begin(9600);
   
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522 

  pinMode(TRIGGER_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

  if (!readConfigFile()) {
    Serial.println("Failed to read configuration file, using default values");
  } else {
    WiFi.printDiag(Serial);
    WiFi.mode(WIFI_STA); 
    unsigned long startedAt = millis();
    Serial.print("After waiting ");
    int connRes = WiFi.waitForConnectResult();
    float waited = (millis()- startedAt);
    Serial.print(waited/1000);
    Serial.print(" secs in setup() connection result is ");
    Serial.println(connRes);
  }

  if (WiFi.status()!=WL_CONNECTED){
    Serial.println("Failed to connect, finishing setup anyway");
  } else{
    Serial.print("Local ip: ");
    Serial.println(WiFi.localIP());
  }
 
}
 
void loop() {
 if ( (digitalRead(TRIGGER_PIN) == LOW)) {
    Serial.println("Configuration portal requested");
    
    char convertedValue[4];
    WiFiManagerParameter p_room("room", "Room Number", "", 4);
    
    WiFiManagerParameter p_server_ip("server_ip", "Server IP", "", 40);

    WiFiManager wifiManager;
    
    wifiManager.addParameter(&p_room);
    
    wifiManager.addParameter(&p_server_ip);

    if (!wifiManager.startConfigPortal()) {
      Serial.println("Not connected to WiFi but continuing anyway.");
    } else {
     
      Serial.println("Connected...yeey :)");
    }

    room = atoi(p_room.getValue());
    server_ip = String(p_server_ip.getValue());
    
    writeConfigFile();

    ESP.reset();
    
    delay(5000);
  }else if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    
    if ( ! rfid.PICC_IsNewCardPresent())
    return;
    
    if ( ! rfid.PICC_ReadCardSerial())
      return;
      
    Serial.print(F("PICC type: "));
    MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
    Serial.println(rfid.PICC_GetTypeName(piccType));
    
    // Check is the PICC of Classic MIFARE type
    if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
      piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
      piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
      Serial.println(F("Your tag is not of type MIFARE Classic."));
      return;
    }
    
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }
   
    Serial.print(F("The NUID tag is:"));
    String uid = hexToString(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["uid"] = uid;
    root["room"] = room;

    char jsonBody[100];
    root.printTo(jsonBody, root.measureLength() + 1);
    Serial.println(jsonBody);
    
    HTTPClient http;
 
    http.begin(server_ip);
    http.addHeader("Content-Type", "application/json");
    
    int httpCode = http.POST(String(jsonBody));
    Serial.print("HTTP request send to: ");
    Serial.println(server_ip);
    if (httpCode == 200) { //Check the returning code
      Serial.println("JSON Parsed succccsessfully");
      digitalWrite(GREEN_LED_PIN, HIGH);
      delay(1000);
      digitalWrite(GREEN_LED_PIN, LOW);
    } else if(httpCode == 401){
      Serial.println("No such database entry");
      tone(BUZZER_PIN, 800);
      delay(1000);
      noTone(BUZZER_PIN);
    }else{
      tone(BUZZER_PIN, 800);
      delay(500);
      noTone(BUZZER_PIN);
      delay(200);
      tone(BUZZER_PIN, 800);
      delay(500);
      noTone(BUZZER_PIN);
      delay(200);
      tone(BUZZER_PIN, 800);
      delay(500);
      noTone(BUZZER_PIN);
    }
 
    http.end();   //Close connection
    rfid.PICC_HaltA();

    // Stop encryption on PCD
    rfid.PCD_StopCrypto1(); 
  }

}

String hexToString(byte *buffer, byte bufferSize){
  String hexString = String("");
  for (byte i = 0; i < bufferSize; i++) {
    hexString = String(hexString + (buffer[i] < 0x10 ? "0" : ""));
    String tmpString = String(buffer[i], HEX);
    hexString = String(hexString + tmpString);
  }
  Serial.println(hexString);
  return hexString;
}

bool readConfigFile() {
  File f = SPIFFS.open(CONFIG_FILE, "r");
  
  if (!f) {
    Serial.println("Configuration file not found");
    return false; 
  } else {
    
    size_t size = f.size();

    std::unique_ptr<char[]> buf(new char[size]);

   
    f.readBytes(buf.get(), size);

    f.close();

    DynamicJsonBuffer jsonBuffer;

    JsonObject& json = jsonBuffer.parseObject(buf.get());

    if (!json.success()) {
      Serial.println("JSON parseObject() failed");
      return false;
    }
    json.printTo(Serial);

    if (json.containsKey("room")) {
      room = json["room"];
      Serial.println(room);
    }
    if (json.containsKey("server_ip")) {
      server_ip = (const char*)json["server_ip"];
    }
  }
  Serial.println("\nConfig file was successfully parsed");
  return true;
}

bool writeConfigFile() {
  Serial.println("Saving config file");
  DynamicJsonBuffer jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  
  json["room"] = room;
  json["server_ip"] = server_ip;

  File f = SPIFFS.open(CONFIG_FILE, "w");
  if (!f) {
    Serial.println("Failed to open config file for writing");
    return false;
  }

  json.prettyPrintTo(Serial);

  json.printTo(f);
  f.close();

  Serial.println("\nConfig file was successfully saved");
  return true;
}
  
