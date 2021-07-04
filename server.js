;const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Check if ID exisits in Array
const someId = msgId => messages.some(message => message.id === parseInt(msgId));

// Return the Message with ID
const findId = msgId => messages.find(message => message.id === parseInt(msgId));

// Remove Message with ID
const filterId = msgId => messages.filter(message => message.id !== parseInt(msgId));

// Get All Messages
app.get("/messages", (req, res) => {
  res.json(messages)
});

// Get a Message by ID
app.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  const matchId = someId(id);

  if (matchId) {
    const idFound = findId(id);
    res.json(idFound);
  } else {
    res.status(404).json({ msg: `No message with the ID of ${id}` });
  }
});

// Create a New Message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: _.uniqueId(),
    from: req.body.from,
    text: req.body.text
  };
  messages.push(newMessage);
  res.json(messages);
});

// Delete a Message by ID
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const deleteId = someId(id);

  if (deleteId) {
    const deleteMsg = filterId(id);
    res.status(200).send({ success: true, msg: `Deleted message with the ID of ${id}` }).json(deleteMsg);
  } else {
    res.status(404).json({ msg: `No message with the ID of ${id}` });
  }
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(PORT);