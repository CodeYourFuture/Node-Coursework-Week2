const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // middleware to parse JSON requests

const welcomeMessage = {
  id: 0,
  from: "Ebrahim",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

// This array is our "data store".
// We will start with one message in the array.
// Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

// Function to find a message by ID
function findMessageById(id) {
  return messages.find((message) => message.id === parseInt(id));
}

// Route to create a new message
app.post("/messages", (req, res) => {
  const { id, from, text } = req.body;
  if (!id || !from || !text || from.trim() === "" || text.trim() === "") {
    return res.status(400).send("Missing or empty fields");
  }
  const newMessage = {
    id: parseInt(id),
    from,
    text,
    timeSent: new Date(),
  };
  messages.push(newMessage);
  res.send(newMessage);
});

// Route to read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// Route to read one message specified by ID
app.get("/messages/:id", (req, res) => {
  const message = findMessageById(req.params.id);
  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.send(message);
});

// Route to update a message specified by ID
app.put("/messages/:id", (req, res) => {
  const message = findMessageById(req.params.id);
  if (!message) {
    return res.status(404).send("Message not found");
  }
  const { from, text } = req.body;
  if (from) message.from = from;
  if (text) message.text = text;
  res.send(message);
});

// Route to delete a message specified by ID
app.delete("/messages/:id", (req, res) => {
  const messageIndex = messages.findIndex(
    (message) => message.id === parseInt(req.params.id)
  );
  if (messageIndex === -1) {
    return res.status(404).send("Message not found");
  }
  messages.splice(messageIndex, 1);
  res.sendStatus(204); // Send a "No Content" response
});

// Route to search for messages containing a given substring
app.get("/messages/search", (req, res) => {
  const { text } = req.query;
  if (!text || text.trim() === "") {
    return res.status(400).send("Missing or empty search parameter");
  }
  const filteredMessages = messages.filter((message) =>
    message.text.includes(text)
  );
  res.send(filteredMessages);
});

// Route to get the most recent messages, up to a limit of 10
app.get("/messages/latest", (req, res) => {
  const limit = Math.min(messages.length, 10);
  const latestMessages = messages.slice(-limit);
  res.send(latestMessages.reverse());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
