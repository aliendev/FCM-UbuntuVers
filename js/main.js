console.log('js connected');

/*******************
// Functions
*******************/

//getElementById function
function ge(id) {
    var theElement = document.getElementById(id);
    return theElement;
};


// process forms
function processForm(formElement) {
    if (formElement.preventDefault) { formElement.preventDefault() };
    console.log('form has been processed.');

    // Return false to prevent the default form behavior
    return false;
}

/*******************
// Variables
*******************/
var form = ge('ubuVersForm'); // form contains ubuVersForm element




/*******************
// Actions
*******************/

// Handle form event
if (form.attachEvent) { // if the browser allows for attachEvent
    // attach processForm function to trigger when submit button is pressed
    form.attachEvent("submit", processForm);
} else { // if not then lets just add the ol' event listener
    // when submit is triggered, run the processForm function
    form.addEventListener("submit", processForm);
};

