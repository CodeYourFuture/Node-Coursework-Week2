const { json } = require("body-parser");
const { request, response } = require("express");
const express = require("express");
//const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
});

// get 10 latest messages

app.get("/messages/latest", (request, response) => {
  const numberOfMessages = messages.length;
  let latestMessages = [];
  if (numberOfMessages > 10) {
    latestMessages = messages.filter(
      (message) => messages.indexOf(message) >= messages.length - 10
    );
    response.status(200).json(latestMessages);
  } else {
    response.status(200).json(messages); // number of latest messages is the same as number of messages
  }
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
      .json({ msg: `message with id  ${messageId} not found` });
  }
});

// create new chat message
let idCounter = 1;
app.post("/messages", (request, response) => {
  const message = request.body;

  if (message.from && message.text) {
    const newMessage = {
      id: idCounter++,
      from: message.from,
      text: message.text,
    };

    messages.push(newMessage);
    response.status(200).json(messages);
  } else {
    response.status(400).json({ msg: "please fill in all fields " });
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

app.listen(PORT);
