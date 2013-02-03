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
	// prevent default operation of the forms
    if ( formElement.preventDefault ) { formElement.preventDefault() };
    console.log('form has been processed.');

    // let's console log whatever you type into the form
    // console logging the whole element will show you the object 
	// you are working with, and what you have access too. This is a great 
	// hint on figuring out what you can do directly.
    console.log(formElement);

	// make sure the fields were not blank
    if ((ge('ubuVersNum').value != '') && (ge('ubuVersName').value != '')) {
		// store the data in our localStorage
		storeData();
		// display the data from storage
		displayData();
    } else { // if one of the fields were blank
		// tell the user to fill out both fields
        alert('You need to fill out both fields to add a version');
    }

	// let's clear those form fields
	ge('ubuVersNum').value = '';
	ge('ubuVersName').value = '';
	
    // Return false to prevent the default form behavior
    return false;
}

// store information in local storage
function storeData() {
	// This is a little bit of future proofing 
	if (!submit.key) {
		// if there is no key, this is a new item and needs a new key
		var id = "ubuVers" + Math.floor(Math.random()*10000001);
	} else {
		// set the id to the existing key we are editing
		id = submit.key;
	};
	
    // I like to give all my form elements their own id's to give myself access
	// outside of the form as well as simple access inside of it
    var ubuVersNumValue = ge('ubuVersNum').value,
        ubuVersNameValue = ge('ubuVersName').value,
		ubuVersDict = {version: ubuVersNumValue, release: ubuVersNameValue};
	// log out those values as a double check
    console.log(ubuVersNumValue);
    console.log(ubuVersNameValue);	
	
	// set the item in localstorage
	// note the stringify function
	localStorage.setItem(id, JSON.stringify(ubuVersDict));
	
	// log out the whole local storage
	console.log(localStorage);
	ge('submit').value = 'Add';


};

// display the data from local storage to screen
function displayData() {
	// empty out our current list 
	ge('ubuntuVersionsDisplayList').innerHTML = "";
	
	// check if localstorage has anything in it
	if (localStorage.length === 0) {
		alert('There is no data in Local Storage');
	}
	else { // there is local storage info
	
		// loop through each item in local storage
		for (var i=0, j=localStorage.length; i<j; i++) {
			// Put the information from the localStorage row into some variables
			var key = localStorage.key(i),
				value = localStorage.getItem(key),
				obj = JSON.parse(value);
			
			// let's check if the key for the entry starts with our ubuvers id.
			// substring lets you grab portions of the string. 0 is the first 
			// character, and 7 means it goes up to character 7. This will read 
			// charachters 1-7 (u b u V e r s). Note: It doesn't read the last 
			// character. 
			if (key.substring(0,7) == "ubuVers") {
				// let's check to make sure we are getting the right keys out
				console.log(key);
				console.log(obj);			
				
				// now that we have our key right. let's display the data already added
				var list = ge('ubuntuVersionsDisplayList'),
					listItem = document.createElement('li'),
					ubuVersNumValue = obj.version,
					ubuVersNameValue = obj.release,
					listText = ubuVersNumValue + ": " + ubuVersNameValue + ' ',
					itemDeleteButton = document.createElement('button'),
					itemDeleteButtonText = "Remove Item";
					itemEditButton = document.createElement('button'),
					itemEditButtonText = "Edit Item";
				
				// delete button	
				itemDeleteButton.setAttribute('id',key),
				itemDeleteButton.onclick = function() {deleteItem(this.id)};
				
				// edit button
				itemEditButton.setAttribute('id',key),
				itemEditButton.onclick = function() {editItem(this.id)};
				
				// setup our buttons and list item with their text
				listItem.innerHTML = listText;
				itemEditButton.innerHTML = itemEditButtonText;
				itemDeleteButton.innerHTML = itemDeleteButtonText;
				
				// append our buttons to the list item
				listItem.appendChild(itemEditButton);
				listItem.appendChild(itemDeleteButton);
				
				// append the list item to the list to be displayed
				list.appendChild(listItem);

			}
		}
		
			
	}
};

function deleteItem(key) {
	// as to make sure the user wants to delete this 
	if (window.confirm('Are you sure you would like to delete this version?')) {
		
		// remove the item from localStorage
		localStorage.removeItem(key);
		
		// let the user know it happened
		alert('The version was delete successfully');
		
		// reload the view
		displayData();
	}
}

function editItem(key) {
	// get the object being edited from local storage
	var value = localStorage.getItem(key),
		obj = JSON.parse(value);
		
	// populate the form with the object
	ge('ubuVersNum').value = obj.version;
	ge('ubuVersName').value = obj.release;
	
	var editButton = ge('submit');
	editButton.value = 'Edit Version';
	editButton.key = key;
}

function clearLocalStorage() {
	// if localStorage is already empty
	if (localStorage.length === 0) {
		
		// let the user know there is already nothing there
		alert('There is no data in localStorage to clear');
		
	} else { // if localStorage is not empty
	
		// make sure the user really wants to clear his localStorage
		if (window.confirm('Are you really sure you want to delete your entire localStorage')) {
			
			// clear local storage
			localStorage.clear();
			
			// display data again
			displayData();
		}
	}
}

/*******************
// Variables
*******************/
var form = ge('ubuVersForm');

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

// display the data to screen from localstorage every time the page loads
displayData();