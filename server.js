const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", function (request, response) {
  let result = messages.filter(
    (message, index) => index > messages.length - 11
  );
  response.json(result);
});

//Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages/search", function (request, response) {
  const searchText = request.query.text.toLocaleLowerCase();
  let result = messages.filter((message) =>
    message.text.toLocaleLowerCase().includes(searchText)
  );
  response.json(result);
});

// Read one message specified by an ID
app.get("/messages/:messageID", function (request, response) {
  const messageID = request.params.messageID;
  if (messageID) {
    const message = messages.filter((message) => message.id == messageID);
    if (message.length != 0) {
      response.json(message);
    } else {
      response.send("The message was not found");
    }
  }
});

//Create a new message
app.post("/messages", function (request, response) {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };

  if (!request.body.from || !request.body.text) {
    response.status(400).json("Please enter your name and message");
  } else {
    messages.push(newMessage);
    response.status(201).json(messages);
  }
});

app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(messages.length - 10));
});

//Delete a message, by ID
app.delete("/message/:id", function (request, response) {
  const messageId = request.params.id;
  messages.splice(
    messages.findIndex((message) => message.id === messageId),
    1
  );
  response.json(messages);
});

const PORT = 3000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
