#include <FS.h>                   //this needs to be first, or it all crashes and burns...

#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino

//needed for library

#include <ArduinoJson.h>          //https://github.com/bblanchon/ArduinoJson
#include "Helpers.h"

//define your default values here, if there are different values in config.json, they are overwritten.
char room_name[128];
char server_ip[128];

// Create MFRC522 instance.
MFRC522 reader(SS_PIN, RST_PIN); //Pins declared in Helpers.h
String card_uid = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println();

  SetupWifiManager(room_name, server_ip);
  SetupRFIDReader(&reader);
}

void loop() {
  
  if(ReadRFIDCard(&reader, &card_uid)){
    Serial.println(card_uid);
    Serial.println(room_name);
    Serial.println(server_ip);

    UrlBuilder(server_ip, room_name, &card_uid);

    int responceCode = SendPostTo(UrlBuilder(server_ip, room_name, &card_uid));

    if(responceCode == 200){
      ActivateBuzzer(1);//good
    }else {
      ActivateBuzzer(0);//bad
    }
    Serial.println(responceCode);
  }

  Buzz();

}
