var msg1 = "Hello! I am Isabella";
var msg2 = "Hola! Soy Isabella";
var msg3 = "Oi! Eu sou Isabella";
var msg4 = "Bonjour! Je m'appelle Isabella";
var msg5 = "Hallo! Ich bin Isabella";
var msg6 = "Hoi! Ik ben Isabella";
var msg7 = "안녕하세요! 저는 이사벨라 입니다"; //defines all the possible messages 

var tb8_messages = [msg1, msg2, msg3, msg4, msg5, msg6, msg7]; // defines tb8_messages as the msg variables stuck together

// Define separate delays between each message (measured in ms of course)
var delay1 = 1500;
var delay2 = 1500;
var delay3 = 1500;
var delay4 = 1500;
var delay5 = 1500;
var delay6 = 1500;
var delay7 = 1500;

var tb8_delays = [delay1, delay2, delay3, delay4, delay5, delay6, delay7]; // defines tb8_delays as the delay variables stuck together

var tb8_rptType = 'infinite'; //the messages repeat inifnitely
var tb8_rptNbr = 5;
var tb8_speed = 100; //messages get typed at 1 character per 100 miliseconds
var tb8_counter = 1;
var tb8_currMsg = 0;
var tb8_tekst = "";
var tb8_i = 0;
var tb8_TID = null;

function tb8_pisi() {
  tb8_tekst = tb8_tekst + tb8_messages[tb8_currMsg].substring(tb8_i, tb8_i + 1);
  document.getElementById("header-text").innerHTML = tb8_tekst; //sets the header text as whatever tb8_tekst is
  tb8_i++;

  if (tb8_i == tb8_messages[tb8_currMsg].length) {
    tb8_i = 0;
    tb8_currMsg++;
    tb8_tekst = "";

    if (tb8_currMsg == tb8_messages.length) { // if the message is done
      if ((tb8_rptType == 'finite') && (tb8_counter == tb8_rptNbr)) { 
        clearTimeout(tb8_TID);
        return;
      }

      tb8_counter++;
      tb8_currMsg = 0;
    }

    // Use the appropriate delay from tb8_delays array
    tb8_TID = setTimeout(function() {
      tb8_pisi();
    }, tb8_delays[tb8_currMsg]);
    return;
  }

  tb8_TID = setTimeout(tb8_pisi, tb8_speed);
}
tb8_pisi();
