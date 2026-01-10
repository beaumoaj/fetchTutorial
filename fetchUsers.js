// Begin with an empty state
const state = {
  users: [], // this is our list of users
  highlight: null, // this will be a div we will hightlight in yellow
};

const endpoint = "https://randomuser.me/api?nat=GB&results=10";

const fetchUsers = async () => {
  const response = await fetch(endpoint);
  return await response.json();
};

function render() {
    console.log(state.users[0]);
    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.className = "container";
    for (let index = 0; index < state.users.length; index++) {
	const person = state.users[index];
	const cell = displayPerson(person);
	div.appendChild(cell);
    }
    content.appendChild(div);
}

function displayPerson(person) {
    const cell = document.createElement("div");
    cell.className = "item";
    const nameHeader = document.createElement("h2");
    const picImg = document.createElement("img");
    const addressP = document.createElement("p");
    const emailP = document.createElement("p");
    emailP.innerText = person.email;
    cell.id = person.email;
    console.log(`person is ${person}`);
    nameHeader.innerText = person.name.first + " " + person.name.last;
    picImg.src = person.picture.large;
    const loc = person.location;
    addressP.innerText = `${loc.street.number} ${loc.street.name}, ${loc.city}, ${loc.postcode}`;
    cell.appendChild(nameHeader);
    cell.appendChild(picImg);
    cell.appendChild(emailP);
    cell.appendChild(addressP);
    return cell;
}

function highlightUser() {
    const email = document.getElementById("emailInput").value;
    const cell = document.getElementById(email);
    if (cell == null) {
	window.alert(`could not find ${email}`);
    } else {
	if (cell != state.highlight) {
	    if (state.highlight != null) {
		state.highlight.style.backgroundColor = "white";
	    }
	    cell.style.backgroundColor = "yellow";
	    state.highlight = cell;
	} else {
	    window.alert(`Already highlighting ${email}`);
	}
    }
}

fetchUsers().then((users) => {
  state.users = users.results;
  render();
});

// Source - https://stackoverflow.com/questions/11365632/how-to-detect-when-the-user-presses-enter-in-an-input-field
// Posted by sachleen, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-13, License - CC BY-SA 4.0
// set up the input field to detect the enter key being pressed
// we do this so we don't need the button any more
document.getElementById('emailInput').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
      // Enter pressed
	highlightUser();
    }
  }
