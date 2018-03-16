#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <SPI.h>
#include <MFRC522.h>

#include <ArduinoJson.h>

#define SS_PIN D8
#define RST_PIN D2

const char* ssid = "SmartSwitch-801";
const char* password = "abcd12348";

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key; 

// Init array that will store new NUID 
byte nuidPICC[4];
 
void setup () {
 
  Serial.begin(9600);
  WiFi.begin(ssid, password);
   
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522 

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.print("Connecting..");
 
  }
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    
    if ( ! rfid.PICC_IsNewCardPresent())
    return;

    // Verify if the NUID has been readed
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
   
    Serial.println(F("The NUID tag is:"));
    Serial.print(F("In hex: "));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    Serial.print(F("In dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    
    String uid = hexToString(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["uid"] = uid;
    char jsonBody[100];
    root.printTo(jsonBody, root.measureLength() + 1);
    Serial.println(jsonBody);
    
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin("http://192.168.43.142:3000/logs");  //Specify request destination
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(String(jsonBody));                //Send the request
 
    if (httpCode == 200) { //Check the returning code

        Serial.println("JSON Parsed succccsessfully");
//      String payload = http.getString();   //Get the request response payload
//      payload += '\n';
//      Serial.print(payload);                     //Print the response payload
// 
    } else if(httpCode == 401){
      Serial.println("No such database entry");
    }
 
    http.end();   //Close connection
 
  }
 
//  delay(10000);    //Send a request every 10 seconds
   // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}

/**
 * Helper routine to dump a byte array as hex values to Serial. 
 */
void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
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

/**
 * Helper routine to dump a byte array as dec values to Serial.
 */
void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}
