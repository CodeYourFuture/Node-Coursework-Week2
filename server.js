//const { json } = require("body-parser");
//const { request, response } = require("express");
const express = require("express");
//const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = 5000;
//app.use(cors());

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
  response.sendFile(__dirname + "/index.html");
});

// get all messages

app.get("/messages", (request, response) => {
  response.status(200).json(messages);
});

// get one message by id

app.get("/messages/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const message = messages.find((item) => item.id === messageId);
  if (message) {
    response.status(200).json(message);
  } else {
    response
      .status(404)
      .json({ msg: `message with this ${messageId} not found` });
  }
});

// create new chat message

app.post("/messages", (request, response) => {
  const newMessage = request.body;
  const index = messages.findIndex((message) => message.id === newMessage.id);

  if (newMessage.id && newMessage.from && newMessage.text && index <= 0) {
    messages.push(newMessage);
    newMessage["timeSent"] = `${new Date()}`;
    response.status(201).json(newMessage);
  } else if (index >= 0) {
    response.status(400).json({ msg: "message with this id already exists" });
  } else {
    response.status(400).json({ msg: "please fill all details" });
  }
});

// delete a message by id

app.delete("/messages/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const index = messages.findIndex((message) => message.id === messageId);
  if (index !== -1) {
    messages.splice(index);
    response.status(204).send("success");
  }
});

// search for a message with a matching text

app.get("/messages/search", (request, response) => {
  const searchTerm = request.query.text;
  const filteredMessage = messages.filter((el) =>
    el.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm) {
    response.status(200).json(filteredMessage);
  }
  response.status(404).send("failed");
  response.end();
});

// get 10 latest messages

app.get("/messages/latest", (request, response) => {
  const numberOfMessages = messages.length;
  let numberOfLatestMessages = [];
  if (numberOfMessages > 10) {
    numberOfLatestMessages = numberOfMessages.slice(
      Math.max(numberOfMessages.length - 10, 1)
    );
    response.status(200).json(numberOfLatestMessages);
  } else {
    response.status(200).json(numberOfMessages); // number of latest messages is the same as number of messages
  }
});

// update a message

//app.listen(process.env.PORT);
app.listen(PORT);
