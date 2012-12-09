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

    // let's console log whatever you type into the form
    // console logging the whole element will show you the object your working with, and what you have access too. This is a great hint on figuring out what you can do directly.
    console.log(formElement);

    // I like to give all my form elements their own id's to give myself access outside of the form as well as simple access inside of it
    ubuVersNumValue = ge('ubuVersNum').value;
    ubuVersNameValue = ge('ubuVersName').value;
    console.log(ubuVersNumValue);
    console.log(ubuVersNameValue);

    if (ubuVersNumValue != '') {
        var list = ge('ubuntuVersionsDisplayList'),
            listItem = document.createElement('li'),
            listText = ubuVersNumValue + ": " + ubuVersNameValue;

        listItem.innerHTML = listText;
        list.appendChild(listItem);
    }


    // Return false to prevent the default form behavior
    return false;
}

/*******************
// Variables
*******************/
var form = ge('ubuVersForm'), // form contains ubuVersForm element
    ubuVersNumValue = '';



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

