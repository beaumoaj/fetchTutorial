// Begin with an empty state
const state = {
  users: [], // this is our list of users
};

const endpoint = "https://randomuser.me/api?nat=GB&results=10";

const fetchUsers = async () => {
  const response = await fetch(endpoint);
  return await response.json();
};

function render() {
    // find the div where we are putting the content
    const content = document.getElementById("content");
    // create a div with the container class to display in a grid
    // see the CSS for the container class
    const div = document.createElement("div");
    div.className = "container";
    // for each person in the list of users
    for (let index = 0; index < state.users.length; index++) {
	// get the person object
	const person = state.users[index];
	// get the HTML displaying that person
	const cell = displayPerson(person);
	// append to the container grid
	div.appendChild(cell);
    }
    // append the container to the content
    content.appendChild(div);
}

function displayPerson(person) {
    // create a div to display this person
    const cell = document.createElement("div");
    // use the CSS class called item
    cell.className = "item";
    // create a h2 header
    const nameHeader = document.createElement("h2");
    // add the person's name to the h2
    nameHeader.innerText = person.name.first + " " + person.name.last;
    // append the h2 to the div
    cell.appendChild(nameHeader);
    // return the div
    return cell

}

fetchUsers().then((users) => {
  state.users = users.results;
  render();
});
