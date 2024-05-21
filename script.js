var msg1 = "Hello! I am Bella";
var msg2 = "Hola! Soy Bella";
var msg3 = "Oi! Eu sou Bella";
var msg4 = "Bonjour! Je m'appelle Bella";
var msg5 = "Hallo! Ich bin Bella";
var msg6 = "Hoi! Ik ben Bella";
var msg7 = "안녕하세요! 저는 벨라 입니다"; //defines all the possible messages 

var tb8_messages = [msg1, msg2, msg3, msg4, msg5, msg6, msg7]; // defines tb8_messages as the msg variables stuck together

// defines separate delays between each message (measured in ms of course)
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
var tb8_speed = 100; // messages get typed at 1 character per 100 miliseconds
var tb8_counter = 1; // how many times the animation has been completed
var tb8_currMsg = 0; // starts at message 0
var tb8_tekst = ""; // empties the text
var tb8_i = 0; // which character of tb8_tekst is currently being added
var tb8_TID = null; // timeout ID, used to control timing

function tb8_pisi() {
  tb8_tekst = tb8_tekst + tb8_messages[tb8_currMsg].substring(tb8_i, tb8_i + 1); // adds the current character to tb8_tekst
  document.getElementById("header-text").innerHTML = tb8_tekst; //sets the header text as whatever tb8_tekst is
  tb8_i++; // tb8_i + 1 (next character)

  if (tb8_i == tb8_messages[tb8_currMsg].length) { // if the message is done
    tb8_i = 0; // start at character 0
    tb8_currMsg++; // increases tb8_currMsg by 1
    tb8_tekst = ""; // empty text

    if (tb8_currMsg == tb8_messages.length) { // if the message is all messages
      if ((tb8_rptType == 'finite') && (tb8_counter == tb8_rptNbr)) { // if tb8_rptType = finite and the animation has played the amount of times it's supposed to, the animation stops
        clearTimeout(tb8_TID); //cancels tb8_pisi
        return;
      }

      tb8_counter++; //tb8_counter + 1
      tb8_currMsg = 0; // start over again
    }

    // Use the appropriate delay from tb8_delays array
    tb8_TID = setTimeout(function() { //makes an id for every timeout it makes
      tb8_pisi();
    }, tb8_delays[tb8_currMsg]); // wait before starting next message
    return;
  }

  tb8_TID = setTimeout(tb8_pisi, tb8_speed); // waits tb8_speed amount of time before restarting
}

window.addEventListener('DOMContentLoaded', (event) => {

    // get all related divs
    const experienceDivs = document.querySelectorAll('.resume > div');

    // separate "mim" div from other divs
    let mimDiv = null;
    const otherDivs = [];
    experienceDivs.forEach(div => {
        if (div.classList.contains('mim')) {
            mimDiv = div;
        } else {
            otherDivs.push(div);
        }
    });

    // sort other divs by year
    otherDivs.sort((a, b) => {
        const h3A = a.querySelector('h3');
        const h3B = b.querySelector('h3');

        // check if <h3> elements exist and contain text content
        if (h3A && h3A.textContent && h3B && h3B.textContent) {
            const yearA = parseInt(h3A.textContent);
            const yearB = parseInt(h3B.textContent);
            return yearB - yearA; // reverse order
        } else {
            console.error("Could not extract year from one or more experience divs:");
            return 0; // return 0 if year cannot be read
        }
    });

    // combine "mim" div and sorted other divs
    const sortedExperienceDivs = [];
    if (mimDiv) {
        sortedExperienceDivs.push(mimDiv);
    }
    sortedExperienceDivs.push(...otherDivs);

    // get the container
    const container = document.querySelector('.resume');

    // clear the container
    container.innerHTML = '';

    // append sorted divs back to container
    sortedExperienceDivs.forEach(div => container.appendChild(div));

});

// This code listens for the DOMContentLoaded event, indicating that the HTML document has been completely loaded and parsed
window.addEventListener('DOMContentLoaded', (event) => {
    // This line selects all checkbox input elements within elements with the class 'checkboxes' and stores them in the 'checkboxes' variable
    const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
    
    // This forEach loop iterates over each checkbox element
    checkboxes.forEach(checkbox => {
        // This line adds an event listener to each checkbox element. It listens for the 'change' event, which triggers when the checkbox is checked or unchecked
        checkbox.addEventListener('change', () => {
            // When a change event occurs (i.e., a checkbox is checked or unchecked), this calls the filterExperiences function
            filterExperiences();
        });
    });
});

// this function is responsible for filtering the experience divs based on the checked checkboxes
function filterExperiences() {
    // this line selects all checkbox input elements within elements with the class 'checkboxes' again and stores them in the 'checkboxes' variable.
    const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
    
    // this line filters the checkboxes to only include those that are checked, then extracts their 'data-filter' attributes and stores them in the 'filters' array
    const filters = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.filter);

    // this line selects all div elements within elements with the class 'resume' and stores them in the 'experienceDivs' variable
    const experienceDivs = document.querySelectorAll('.resume > div');
    
    // this forEach loop iterates over each div element representing an experience
    experienceDivs.forEach(div => {
        // this line retrieves the 'data-category' attribute value from the current div element and stores it in the 'category' variable
        const category = div.dataset.category;
        
        // this conditional statement checks if there are no filters selected or if the category of the current div is included in the selected filters
        if (filters.length === 0 || filters.includes(category)) {
            // If the above condition is true, the div is displayed by setting its 'display' style property to 'block'
            div.style.display = 'block';
        } else {
            // if the above condition is false, the div is hidden by setting its 'display' style property to 'none'
            div.style.display = 'none';
        }
    });
}

tb8_pisi();
