const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
//these two middleware functions allow an 
//Express app to parse the request body of an HTTP request
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Enables a new message to be created 
app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  if (!from || !text) {
    return response.status(400).send("Please provide a name and a message");
  }

  const newMessage = {
    id: messages.length,
    from,
    text,
  };

  messages.push(newMessage);
  response.json(messages);
});
// Gets all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// allows to Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  const id = request.params.id;
  const message = messages.find(msg => msg.id === id);

  if (!message) {
    return response.status(400).send("Message not found");
  }

  response.json(message);
});