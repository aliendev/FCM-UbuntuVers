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

    if ((ge('ubuVersNum').value != '') && (ge('ubuVersName').value != '')) {
		storeData();	
		displayData();
    } else {
        alert('You need to fill out both fields to add a version');
    }


    // Return false to prevent the default form behavior
    return false;
}

// added in part 5
// store information in local storage
function storeData(key) {
	// This is a little bit of future proofing 
	if (!key) {
		// if there is no key, this is a new item and needs a new key
		var id = "ubuVers" + Math.floor(Math.random()*10000001);
	} else {
		// set the id to the existing key we are editing
		id = key;
	};
	
    // I like to give all my form elements their own id's to give myself access outside of the form as well as simple access inside of it
    var ubuVersNumValue = ge('ubuVersNum').value,
        ubuVersNameValue = ge('ubuVersName').value,
		ubuVersDict = {version: ubuVersNumValue, release: ubuVersNameValue};
    console.log(ubuVersNumValue);
    console.log(ubuVersNameValue);

	var list = ge('ubuntuVersionsDisplayList'),
	listItem = document.createElement('li'),
	listText = ubuVersNumValue + ": " + ubuVersNameValue;
	
	listItem.innerHTML = listText;
	list.appendChild(listItem);
	
	
	// added in pt. 5
	// set the item in localstorage
	localStorage.setItem(id, ubuVersDict);
	// log out the whole local storage
	console.log(localStorage);

};

// added in part 5
// display the data from local storage to screen
function displayData() {
	// check if localstorage has anything in it
	if (localStorage.length === 0) {
		alert('There is no data in Local Storage');
	}
	else { // there is local storage info
		
		// loop through each item in local storage
		for (var i=0, j=localStorage.length; i<j; i++) {
			alert(localStorage);
		}
		
			
	}
};

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

// added in part 5 
// display the data to screen from localstorage every time the page loads
displayData();