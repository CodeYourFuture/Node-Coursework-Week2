const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(
    "/home/codeyourfuture/Documents/GitHub/HTML-CSS-Coursework-Week4/Grid Project/Node-Coursework-Week2/index.html"
  );
});

// GET METHOD MESSAGES ENDPOINT
app.get("/messages", function (request, response) {
  // const filteredValue =
  messages.filter((message) => {
    if (message.id == request.query.id) {
      console.log("GET METHOD --> QUERY WORKED");
      response.send(message);
    } else {
      console.log("GET METHOD --> QUERY DIDNT PASS");
      response.send(messages);
    }
  });
});

// PUT METHOD
app.put("/messages", function (request, response) {
  messages.push(request.query);
  response.send(messages);
  console.log("PUT METHOD --> " + request.query);
});

// DELETE METHOD
app.delete("/messages", function (request, response) {
  messages.filter((message) => {
    if (message.id == request.query.id) {
      console.log("before delete : -->" + messages);
      let indexVal = messages.indexOf(message);
      let newVal = messages.splice(indexVal, 1);
      console.log("after delete : -->" + newVal);
      response.json(messages);
    } else {
      response.send("YOUR MESSAGE WAS NOT DELETED");
      console.log("YOUR MESSAGE WAS NOT DELETED");
    }
  });
});

app.listen(5501, () => {
  console.log("Server started on 5501");
});
