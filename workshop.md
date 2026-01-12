author: Tony Beaumont
summary: Fetching API data
id: docs
categories: javascript, fetch, json
tags: fetch, javascript
status: Draft
environments: Web
Feedback Link: ajbeaumont.tb@gmail.com

#  Fetching API data

## Introduction

In this workshop you are going to learn how to use `fetch` to get some data in JSON format from an API.  

### What you'll need

- VS Code
- Node
- CYF extensions installed in VS Code

### What you'll learn

* How to fetch data from an API, in this case data representing random fictitious people.
* How to write an `async` function and use `await` to wait for a response
* How to call an `async` function using either `await` or `.then()`
* How to render the JSON data we get in a web page.

## Getting data about random users

Go to [https://randomuser.me]([https://randomuser.me) and look at the home page.  It is a rendering of some information about a random (fictitious) user.  You can get such data for yourself.  Let's do that now.

1. Enter [https://randomuser.me/api]([https://randomuser.me/api) into your browser and observe what you get.  The JSON code below shows a response I got when I used the request [https://randomuser.me/api?nat=gb](https://randomuser.me/api?nat=gb) which specifies through the parameter `nat=gb` that the data should reflect a British user.
   
    ```javascript
    {
        "results":[
        {
            "gender":"female",
            "name":{
            "title":"Miss",
            "first":"Brooke",
            "last":"Morrison"
            },
            "location":{
            "street":{
                "number":4134,
                "name":"Stanley Road"
            },
            "city":"Ripon",
            "state":"Humberside",
            "country":"United Kingdom",
            "postcode":"NO2V 2WE",
            "coordinates":{
                "latitude":"-56.0759",
                "longitude":"99.0842"
            },
            "timezone":{
                "offset":"-7:00",
                "description":"Mountain Time (US & Canada)"
            }
            },
            "email":"brooke.morrison@example.com",
            "login":{
            "uuid":"2a026cb8-fab9-499e-a53c-cefe1984f3d9",
            "username":"smallrabbit896",
            "password":"canon",
            "salt":"PQJKL44w",
            "md5":"15f0f4c50c4a161b11d48c5fd61fc66b",
            "sha1":"a05d1b3deebb6668fd8bda330cffc127cd602355",
            "sha256":"90154f0e072d7c6256070b2cd17724c70c17a977aee2bda6e0ba53e79af4bfbf"
            },
            "dob":{
            "date":"2000-04-17T13:19:33.931Z",
            "age":25
            },
            "registered":{
            "date":"2020-09-03T18:31:44.668Z",
            "age":5
            },
            "phone":"0114084 333 9122",
            "cell":"07298 319447",
            "id":{
            "name":"NINO",
            "value":"NG 93 19 70 B"
            },
            "picture":{
            "large":"https://randomuser.me/api/portraits/women/6.jpg",
            "medium":"https://randomuser.me/api/portraits/med/women/6.jpg",
            "thumbnail":"https://randomuser.me/api/portraits/thumb/women/6.jpg"
            },
            "nat":"GB"
        }
        ],
        "info":{
        "seed":"a2bd05d1564baf05",
        "results":1,
        "page":1,
        "version":"1.4"
        }
    }
    ```
    Note that the top level properties of the JSON data we get are `results` and `info`.  The `results` property is a list of objects, each describing a user.  In the example above we only have one user returned.  If we want more users returned we should add the parameter `results=10` which would get us data on 10 users, for example [https://randomuser.me/api?nat=gb&results=10](https://randomuser.me/api?nat=gb&results=10).

## Fetching the data in Javascript

1. We will start with the code below.  Save it into a file called `fetchUsers.js`.
    ```javascript
    const endpoint = "https://randomuser.me/api?nat=GB&results=10";

    const fetchUsers = () => {
        const response =  fetch(endpoint);
        console.log(response);
    };

    fetchUsers();
    ```
	> aside negative
	> The code above does not work in the way we want it to.  We will eventually turn it into code that we can use.

2. Run this code by typing `node fetchUsers.js` into the terminal and you should see the following output:
    ```console
    Promise { <pending> }
    ```
	This `Promise` output is not the data we expected.  

### What does this mean?  What is a `Promise` and why is it pending?

A request over the internet to a server asking for data takes some time.  In fact it takes longer than it takes for the running Javascript code to get to the `console.log` command, so at this point we don't yet have a response, only a promise of a response.  This is how Javascript handles any request that may return a result a some time in the future.

## Waiting for a response

To tell Javascript to wait for an answer to the request we need to use the keyword `await`.  As we shall see, `await` on its own is not enough.

1. Edit `fetchUsers.js` to add an `await` immediately before the `fetch`.  Your code should look like this:

    ```javascript
    const endpoint = "https://randomuser.me/api?nat=GB&results=10";

    const fetchUsers = () => {
      const response =  await fetch(endpoint);
      console.log(response);
    };
    ```

2. Run the program again and you will see an error message that starts with a message like this:
    ```console
    $ node fetchUsers.js 
    ./fetchUsers.js:4
      const response =  await fetch(endpoint);
                        ^^^^^

    SyntaxError: await is only valid in async functions and the top level bodies of modules
    ```
    The first line of the above error message is the command to run the program.  The next line is the first line of the response telling us there is an error on line 4 of `fetchUsers.js` (the line number may be different in your version but the next line shows that the error is related to the `await` that we just added to the code.  The description below that tells us that we can only use `await` in an `async` function.

## Why do we need an async function?

When the `await` keyword is seen, execution of the program is suspended until we get a response.  Javascript does not allow us to suspend the main thread of our program, so we need to label the function with `async` to allow it to be executed in another thread which can be suspended.  Functions labelled `async` may include one or more `await` statements.

1. Update your function to add the `async` label:
    ```javascript
    const fetchUsers = async () => {
        const response =  await fetch(endpoint);
        console.log(response);
    };
    ```

2. Now when you run the program you should see a Javascript `Resonse` object printed, something like this:
    ```javascript
    Response {
      status: 200,
      statusText: 'OK',
      headers: Headers {
        date: 'Sat, 10 Jan 2026 19:48:27 GMT',
        'content-type': 'application/json; charset=utf-8',
        'transfer-encoding': 'chunked',
        connection: 'keep-alive',
        server: 'cloudflare',
        nel: '{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}',
        'x-powered-by': 'Express',
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache',
        etag: 'W/"2afe-hd1KiK9lTc0OZKzR1KXTkcTw+vk"',
        vary: 'Accept-Encoding',
        'content-encoding': 'gzip',
        'cf-cache-status': 'DYNAMIC',
        'report-to': '{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=nBveFtQvSI%2BDjlsw0CZxsFZtP9M53pQlWiuIZSiFG33ccE8OsPtIWqm5N8sukn51QXIw4EjOQ4Gpi4KbrZXuv9UlpMspoqykJ2ifvHlxDJb8fnl5XSwOtN8%3D"}]}',
        'cf-ray': '9bbeb1287d8f7685-LHR',
        'alt-svc': 'h3=":443"; ma=86400'
      },
      body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
      bodyUsed: false,
      ok: true,
      redirected: false,
      type: 'basic',
      url: 'https://randomuser.me/api?nat=GB&results=10'
    }
    ```

The `Response` object represents the HTTP response to our fetch request and it contains `status: 200` and `statusText: 'OK'` which means that the request was successful.  So where is our data?

## Accessing the JSON data

The Javascript `Response` object has a `json()` function that allows us to retrieve the json data contained in the body of the response.  We cannot just use `console.log(response.json())` because we will again only see a promise (try it and see).

We need to use `await` again to wait for the `json()` function to return the data.

1.  Edit your `fetchUsers` function to add a second `await` and store the JSON data into a variable called `data`.  Then log the data:
    ```javascript
    const endpoint = "https://randomuser.me/api?nat=GB&results=10";

    const fetchUsers = async () => {
        const response =  await fetch(endpoint);
        const data = await response.json();
        console.log(data);
    };
    ```
2.  Now when we run the code, we should see the data we requested.  Notice that the `endpoint` variable contains parameters asking for 10 results. When you run the code, you should see that the `results` list contains 10 objects describing 10 random users as shown below.
    ```javascript
    {
      results: [
        {
          gender: 'female',
          name: [Object],
          location: [Object],
          email: 'sophia.peterson@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '013873 56104',
          cell: '07579 802772',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'male',
          name: [Object],
          location: [Object],
          email: 'clayton.fleming@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '017684 58931',
          cell: '07512 782987',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'female',
          name: [Object],
          location: [Object],
          email: 'grace.sanchez@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '017683 12435',
          cell: '07386 963146',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'male',
          name: [Object],
          location: [Object],
          email: 'alfredo.dixon@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '017684 13508',
          cell: '07590 506685',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'male',
          name: [Object],
          location: [Object],
          email: 'benjamin.robinson@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '015396 56150',
          cell: '07417 875632',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'female',
          name: [Object],
          location: [Object],
          email: 'kaitlin.cunningham@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '013873 42730',
          cell: '07041 351521',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'male',
          name: [Object],
          location: [Object],
          email: 'victor.vasquez@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '015242 32416',
          cell: '07134 262199',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'female',
          name: [Object],
          location: [Object],
          email: 'zoe.russell@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '015396 09711',
          cell: '07599 235236',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'male',
          name: [Object],
          location: [Object],
          email: 'herman.jenkins@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '015396 37578',
          cell: '07024 254503',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        },
        {
          gender: 'female',
          name: [Object],
          location: [Object],
          email: 'susanna.robertson@example.com',
          login: [Object],
          dob: [Object],
          registered: [Object],
          phone: '015396 73871',
          cell: '07793 051687',
          id: [Object],
          picture: [Object],
          nat: 'GB'
        }
      ],
      info: { seed: '3503238b14f68fd8', results: 10, page: 1, version: '1.4' }
    }
    ```

## Returning the JSON data

Lets update our function to return the data and see what we get back.  

1. Edit your function to remove the `console.log`, and add a `return` statement to return the data.  Then wrap the call to `fetchUsers` in a `console.log` as shown below so we can see what we are getting back from our function:
    ```javascript
    const endpoint = "https://randomuser.me/api?nat=GB&results=10";

    const fetchUsers = async () => {
        const response =  await fetch(endpoint);
        const data = await response.json();
        return data;
    };

    console.log(fetchUsers());
    ```

1.  Run this version and you again see the output `Promise { &lt;pending&gt; }`.
	We see that output because `fetchUsers` is an `async` function and runs in another thread.  We need our call to `fetchUsers` to `await` its response. 

### An `async` function should be called with `await`

1. Edit your code once more to await the result of the call to `fetchUsers`:
    ```javascript
    const endpoint = "https://randomuser.me/api?nat=GB&results=10";

    const fetchUsers = async () => {
        const response =  await fetch(endpoint);
        const data = await response.json();
        return data;
    };

    const userData = await fetchUsers();
    console.log(userData);
    ```

1.  Run the code.  Now we see the JSON data we requested which is in the `userData` variable and we can then use that data however we want.

### Using `then` in place of `await`

There is an alternative way to write the call to `fetchUsers`.  We can use `then` to code a function that will be called when a response has been received.

1. Rewrite the last two lines of the code above as follows:
    ```javascript
    fetchUsers().then((userData) => {
        console.log(userData);
    });
    ```

When you run this version, you should again see the JSON data being printed.  You should prefer to use the `then` syntax when calling an `async` function.

## Rendering the data in a web page

1.  Create an `index.html` where we will display the user data.  We will include the `fetchUsers` script in the file and set up a `div` where we can display the users.
    ```html
    <html>
      <head>
        <title>Random Users</title>
        <link rel="stylesheet" href="./users.css"/>
      </head>
      <body>
        <h1>Some random users</h1>
        <!-- The content should be inserted into this div -->
        <div  id="content"></div>
      </body>
      <script src="./fetchUsers.js"></script>
    </html>
    ```
	
	In VSCode you can right click the `index.html` and choose `View in Live Server`.  Do that now, you should see a page with the `h1` header and if you open the developer tools and look in the console you should see the output of the `console.log`.
1. Create the CSS file we will use to format the data when we display it.  Save the following code into a file called `users.css` which you will see referenced in the `index.html` as the stylesheet being used:
    ```css
    .container {
        display: grid;
        grid-template-columns: auto auto auto auto;
        padding: 10px;
        width = 95%;
    }

    .item {
        padding: 8px;
        margin: 4px;
        border: solid;
        align-items: center;
    }

    .item img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .item p {
        text-align: center;
    }
    ```

1. Update our `fetchUsers.js` file to add a new function to render the data in the web page.  I've used a `state` object which is similar to the one used in your TV project starter code so that you can use this tutorial to guide you in writing the code for that project.  We will use the `state` object to store the data we get from the API so that only need make one call to the API. Add this code to the start of `fetchUsers.js` to create a `state` object:

    ```javascript
    const state = {
      users: [], // this is our list of users
    };
    ```
1. Now update the code to call `fetchUsers` so that it stores the resulting list of users into `state.users` and calls a new function called `render` (which will do the job of creating the HTML objects to display our data):
    ```javascript
    fetchUsers().then((users) => {
      state.users = users.results;
      render();
    });
    ```
1.  Now add the `render` and `displayPerson` functions:
    ```javascript
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
            // get the HTML to display that person
            const cell = displayPerson(person);
            // append this person's HTML to the container grid
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
    ```
	
	The `displayPerson` function is where we create a HTML objects that display the details of a person.  In the example above we are only displaying their names.
1.  View the `index.html` in your live server, you should see a grid with 10 names.

## Displaying more information

We can display other data too.  Lets add the persons photo and their address.  

1. Update your `displayPerson` as shown below to display the photo using an `img` element and their address using a `p` element:
    ```javascript
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
        // create an img element
        const picImg = document.createElement("img");
        // set the src of the image to be the url of the large image
        picImg.src = person.picture.large;
        // append the image to the cell
        cell.appendChild(picImg);
        // create a p element to show the person's address
        const addressP = document.createElement("p");
        // get the address
        const loc = person.location;
        // add the address to the p element
        addressP.innerText = `${loc.street.number} ${loc.street.name}, ${loc.city}, ${loc.postcode}`;
        // append the p to the div
        cell.appendChild(addressP);
        // return the div
        return cell
    }
    ```

1. Reload the page in your browser and the grid should now contain a picture for each person and their address.

## Conclusion

### What we've covered

* How to write an `async` function and use `await` to wait for a response
* How to call an `async` function and use either `await` or `then` to process the response.
* Processed the JSON data from the random user API to render it in a HTML file
* Viewed the resulting HTML in the live server.
