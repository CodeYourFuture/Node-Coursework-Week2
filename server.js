const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Create a new message
app.post("/messages", function (req, res) {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };
  if (!newMessage.from || !newMessage.text) {
    res.status(400).send("Please provide a name and a message");
  }
  messages.push(newMessage);
  res.json(messages);
});

// Get all messages
app.get("/messages", function (req, res) {
  res.json(messages);
});

// Search for messages containing a string
app.get("/messages/search", function (req, res) {
  const text = req.query.text;
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(text.toLowerCase())
  );
  console.log(filteredMessages);
  filteredMessages.length > 0
    ? res.json(filteredMessages)
    : res.status(400).send("No messages found");
});

// Read one message specified by id
app.get("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  if (!message) {
    res.status(400).send("Message not found");
  }
  res.json(message);
});


// Delete one message specified by id
app.delete("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  if (!message) {
    res.status(400).send("Message not found");
  }
  messages.splice(messages.indexOf(message), 1);
  res.json(messages);
});



const listener = app.listen(5001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
