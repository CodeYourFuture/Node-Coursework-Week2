const express = require("express");
const cors = require("cors");
const { listen } = require("express/lib/application");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

let nextId = 1;

//create a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: nextId++,
    from: req.body.from,
    text: req.body.text,
  };
  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json({
      msg: "Unable to send message. Please include both name and text",
    });
  }
  messages.push(newMessage);
  res.status(200).json(messages);
});

//read messages containing substring
app.get("/messages/search", (req, res) => {
  let searchTerm = req.query.text.toLowerCase();
  let messagesFiltered = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm)
  );
  if (messagesFiltered.length > 0) {
    res.status(200).json(messagesFiltered);
  } else {
    res
      .status(404)
      .json({ message: `No messages containing '${searchTerm}' found.` });
  }
});

//read messages containing search term
app.get("/messages/search", (req, res) => {
  let searchTerm = req.query.text.toLowerCase();
  let messagesFiltered = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm)
  );
  if (messagesFiltered.length > 0) {
    res.status(200).json(messagesFiltered);
  } else {
    res
      .status(404)
      .json({ message: `No messages containing '${searchTerm}' found.` });
  }
});

//read most recent messages
app.get("/messages/latest", (req, res) => {
  if (messages.length > 0) {
    res.status(200).json(messages.splice(-10));
  } else {
    res.status(404).json({ message: `No new messages.` });
  }
});

//read one message using ID
app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  let messageToRead = messages.find((message) => message.id === messageId);
  if (messageToRead) {
    res.status(200).json(messageToRead);
  } else {
    res
      .status(404)
      .json({ message: `No message with ID: ${messageId} found.` });
  }
});

//delete message by ID
app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const messageLocation = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageLocation === -1) {
    res.status(400).send({ message: "Message not found" });
  } else {
    messages.splice(messageLocation, 1);
    res
      .status(200)
      .send({ message: `Message ${messageId} deleted.`, success: true });
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
