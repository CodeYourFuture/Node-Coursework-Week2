
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

const messages = [welcomeMessage];

// Middleware function for validation
function validateMessage(req, res, next) {
  const { from, text } = req.body;
  if (!from || !text) {
    return res
      .status(400)
      .json({ error: "Both 'from' and 'text' fields are required." });
  }
  next();
}

// Create a new message
app.post("/messages", validateMessage, function (req, res) {
  const newMessage = req.body;
  newMessage.id = messages.length;
  newMessage.timeSent = new Date();
  messages.push(newMessage);
  res.json(newMessage);
});

// Read all messages
app.get("/messages", function (req, res) {
  res.json(messages);
});

// Read one message by an ID
app.get("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  if (!message) {
    return res.status(404).json({ error: "Message not found." });
  }
  res.json(message);
});

// Read messages whose text contains a given substring
app.get("/messages/search", function (req, res) {
  const searchText = req.query.text;
  const filteredMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchText.toLowerCase())
  );
  res.json(filteredMessages);
});



app.get("/messages/latest", function (req, res) {
  // Sort messages by timeSent in descending order (newest first)
  const sortedMessages = messages.sort((a, b) => b.timeSent - a.timeSent);
  // Get the last 10 messages
  const latestMessages = sortedMessages.slice(0, 10);
  console.log(latestMessages);
  res.json(latestMessages);
});

// Update a message by ID
app.put("/messages/:id", validateMessage, function (req, res) {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found." });
  }

  const updatedMessage = req.body;
  messages[index] = {
    ...messages[index],
    ...updatedMessage,
    id,
    timeSent: messages[index].timeSent,
  };
  res.json(messages[index]);
});

// Delete a message by ID
app.delete("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found." });
  }
  messages.splice(index, 1);
  res.json({ message: "Message deleted successfully." });
});


// Default error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const PORT = 18080;
app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT + "......");
});
