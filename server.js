const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Ben",
    text: "Hello my application!",
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = welcomeMessage;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  res.send(messages[req.params.id]);
});

//Create a new message
app.post("/messages", (req, res) => {
  const addMessage = {
    id: uuid(),
    from: req.body.from,
    text: req.body.text,
  };

  if (req.body.from.length > 0 && req.body.text.length > 0) {
    messages.push(addMessage);
    res.status(200).send("New message added");
  } else {
    res.status(400).send("Please write your name and message!");
  }
});

//Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  res.send(messages[req.params.id]);
});

app.listen(process.env.PORT || 5000);
