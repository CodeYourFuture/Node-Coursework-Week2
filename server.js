const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// read all messages
app.get("/messages", (request, response) => {
  response.status(200);
  response.json(messages);
});

// post a message
app.post("/messages", (request, response) => {
  const message = request.body;
  message.id = messages.length;

  const timeSent = new Date().toLocaleString();
  message.timeSent = timeSent;

  if (!request.body.from || !request.body.text) {
    response.status(400);
    response.send("Please fill all the fields");
  } else {
    response.status(200);
    messages.push(message);
    response.send(messages);
  }
});

// search for a specific word in the message
app.get("/messages/search", (request, response) => {
  const searchWord = request.query.text;
  const filteredMessages = messages.filter((message) => {
    return message.text.includes(searchWord);
  });

  response.send(filteredMessages);
});

// get message by id
app.get("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  const foundMessage = messages.find((message) => {
    return message.id === id;
  });
  response.status(200);
  response.json(foundMessage);
});

// delete message by id
app.delete("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  messages.map((message) => {
    message.id === id ? messages.splice(id, 1) : null;
  });
  response.status(200);
  response.send(`You have deleted a message with id ${id}`);
});

app.listen(port);
