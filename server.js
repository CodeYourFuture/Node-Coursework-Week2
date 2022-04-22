const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Create a new message
app.post("/messages", function (request, response) {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };
  if (!newMessage.from || !newMessage.text) {
    response.status(400).send("Please provide a name and a message");
  }
  messages.push(newMessage);
  response.json(messages);
});

// Get all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// Read one message specified by id
app.get("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const message = messages.find((message) => message.id === id);
  if (!message) {
    response.status(400).send("Message not found");
  }
  response.json(message);
});

// Delete one message specified by id
app.delete("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const message = messages.find((message) => message.id === id);
  if (!message) {
    response.status(400).send("Message not found");
  }
  messages.splice(messages.indexOf(message), 1);
  response.json(messages);
});

const listener = app.listen(5001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
