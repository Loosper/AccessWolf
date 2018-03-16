#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 
const char* ssid = "TP-LINK";
const char* password = "abcd1234";
 
void setup () {
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.print("Connecting..");
 
  }
 
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin("http://192.168.1.127:3000/users/12345.json");  //Specify request destination
    http.addHeader("Content-Type", "application/json");
//    http.addBpdy(json.toString());
    int httpCode = http.POST();                                                                  //Send the request
 
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
 
  delay(10000);    //Send a request every 10 seconds
 
}

void serialEvent() {
  while (Serial.available()) {
    String data = Serial.readString();
    if(data == "Reset"){
      Serial.println("Reseting ESP");
      ESP.reset();
    }
  }
}

