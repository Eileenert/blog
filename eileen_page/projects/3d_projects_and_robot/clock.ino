#include <ThreeWire.h>  
#include <RtcDS1302.h>
#include <FastLED.h>


#define LED_PIN     2 
#define NUM_LEDS    4
#define BUTTON1_PIN 14  
#define BUTTON2_PIN 15 
#define BUTTON3_PIN 16 

//shift register
#define LATCH_PIN 8
#define CLOCK_PIN 7
#define DATA_PIN 6

int nbr[10] = {0, 1, 4, 5, 8, 9, 12, 13, 2, 3}; // parce que je me suis trompée dans le branchement des pins (corrigé sur nouveau circuit)

CRGB leds[NUM_LEDS];
uint8_t hue(0);
int animation(0);

ThreeWire myWire(4,5,3); // DATA, CLK, RST   
RtcDS1302<ThreeWire> Rtc(myWire);

RtcDateTime initRtc(RtcDS1302<ThreeWire>*);  //initialise RTC

void ledAnimation();

int h(0);
int m(0);
void buttonTime(int &h, int&m);

void setup () {
    Serial.begin(9600);

    // ----- RTC ------------
    Rtc.Begin();
    RtcDateTime compiled = initRtc(&Rtc);    //initialise RTC

    // ------- LED ---------------
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
    FastLED.setBrightness(50);

    // -------- BUTTON --------
    pinMode(BUTTON1_PIN, INPUT_PULLUP);
    pinMode(BUTTON2_PIN, INPUT_PULLUP);

    // ------ SHIFT REGISTER ------------------
    pinMode(LATCH_PIN, OUTPUT);
    pinMode(CLOCK_PIN, OUTPUT);
    pinMode(DATA_PIN, OUTPUT);   
}


void loop () {
    RtcDateTime now = Rtc.GetDateTime();

    uint8_t hour = now.Hour() + h;
    uint8_t minute = now.Minute() + m;


    digitalWrite(LATCH_PIN, LOW);
    Serial.println(hour / 10);
    shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, nbr[minute % 10] <<4 | nbr[minute / 10]);
    shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, (nbr[hour % 10]) <<4 | nbr[hour / 10]);
    
    
    digitalWrite(LATCH_PIN, HIGH);
    
    ledAnimation();
    buttonTime(h, m);

    delay(100); // every 0.1 sec
}


RtcDateTime initRtc(RtcDS1302<ThreeWire>*){
    //Initialise RTC

     RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
    if (!Rtc.IsDateTimeValid()) {
        /*Common Causes:
            1) first time you ran and the device wasn't running yet
            2) the battery on the device is low or even missing*/
        Serial.println("RTC lost confidence in the DateTime!");
        Rtc.SetDateTime(compiled);
    }

    if (Rtc.GetIsWriteProtected()){
        Serial.println("RTC was write protected, enabling writing now");
        Rtc.SetIsWriteProtected(false);
    }

    if (!Rtc.GetIsRunning()){
        Serial.println("RTC was not actively running, starting now");
        Rtc.SetIsRunning(true);
    }

    RtcDateTime now = Rtc.GetDateTime();
    if (now < compiled) {
        Serial.println("RTC is older than compile time!  (Updating DateTime)");
        Rtc.SetDateTime(compiled);
    }
    else if (now > compiled) {
        Serial.println("RTC is newer than compile time. (this is expected)");
    }
    else if (now == compiled) {
        Serial.println("RTC is the same as compile time! (not expected but all is fine)");
    }
}

void buttonTime(int &h, int&m){
    RtcDateTime now = Rtc.GetDateTime();
    byte buttonState2 = digitalRead(BUTTON2_PIN);
    byte buttonState3 = digitalRead(BUTTON3_PIN);
    uint8_t nowHour = now.Hour();
    uint8_t nowMinute = now.Minute();


    if (buttonState2 == HIGH){
        if( (nowHour + h) > 22){
            h = 0 - now.Hour() ;
        }
        else{
            h += 1;
        }
        
    }
    if (buttonState3 == HIGH){
        if( (nowMinute + m) > 58){
            m = 0 - now.Minute() ;
        }
        else{
            m += 1;
        }
    }
}


void ledAnimation(){

    byte buttonState = digitalRead(BUTTON1_PIN);

  
    if (buttonState == HIGH) {
        animation ++;
        if (animation == 5){
            animation = 0;
        }
        delay(100);
    }

    if (animation == 0){
        leds[0] = CHSV(80, 255, 127);
        for(int i(0); i<NUM_LEDS; i++){
            leds[i] = CHSV(hue, 255, 220);
        }

        EVERY_N_MILLISECONDS(50){
            hue++;
        }

        FastLED.show();

        delay(100);
    }
    else if(animation == 1){
        fill_solid(leds, NUM_LEDS, CRGB::Red);
        FastLED.show();

    }
    else if(animation == 2){
        fill_solid(leds, NUM_LEDS, CRGB::Blue);
        FastLED.show();

    }
    else if(animation == 3){
        fill_solid(leds, NUM_LEDS, CRGB::Green);
        FastLED.show();

    }
    else if(animation == 4){
        fill_rainbow(leds, NUM_LEDS, 0, 255/NUM_LEDS);
        FastLED.show();
    }

};
