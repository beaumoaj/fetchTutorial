const endpoint = "https://randomuser.me/api?nat=GB&results=10";

const fetchUsers = async () => {
    const response =  await fetch(endpoint);
    const data = await response.json();
    return data;
};

fetchUsers().then((userData) => {
    console.log(userData);
});
