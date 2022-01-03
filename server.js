const express = require("express");
const cors = require("cors");
const moment = require("moment");
const app = express();
const port = 5500;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: "The beginning of time...",
};

const messageTwo = {
  id: 1,
  from: "John",
  text: "This is message Two!",
  timeSent: "The beginning of time...",
};

const messageThree = {
  id: 2,
  from: "Anon",
  text: "Another message!",
  timeSent: "The beginning of time...",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, messageTwo, messageThree];
let messageId = messages.length;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const sentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  const newMessage = {
    id: messageId,
    from: req.body.from,
    text: req.body.text,
    timeSent: sentDate,
  };

  !newMessage.from || !newMessage.text
    ? res.status(400).json({ message: "This message is incomplete." })
    : messages.push(newMessage),
    messageId++,
    res.json(newMessage);
});

app.get("/messages/search", (req, res) => {
  const searchTerm = req.query.text;
  const filtered = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filtered);
  filtered.length !== 0
    ? res.json(filtered)
    : res.status(404).json({ message: "Message not found." });
});

app.get("/messages/latest", (req, res) => {
  const latest = messages.filter((element) => {
    return element.id < 10;
  });
  res.json(latest);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const filteredMessage = messages.find((element) => element.id === messageId);
  filteredMessage
    ? res.json(filteredMessage)
    : res.status(404).json({ message: "Message not found." });
});

app.delete("/messages/:id", (req, res) => {
  const inputId = parseInt(req.params.id);
  const indexOfDeleted = messages.findIndex(
    (element) => element.id === inputId
  );
  indexOfDeleted !== -1
    ? (messages.splice(indexOfDeleted, 1),
      res.status(200).json({ message: "Message deleted." }))
    : res.status(404).json({ message: "Message not found." });
});

app.put("/messages/update/:id", (req, res) => {
  const idOfMessage = parseInt(req.params.id);
  const update = req.body;
  const updated = messages.find((element) => element.id === idOfMessage);
  updated.from = update.from;
  updated.text = update.text;
  res.status(200).json(updated);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
