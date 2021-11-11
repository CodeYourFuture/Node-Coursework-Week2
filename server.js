const express = require("express");
const cors = require("cors");

// Import library to generate random id's.
const { v4: uuidv4 } = require("uuid");

// const { application } = require("express");

const app = express();

// Required when POST comes from a form
app.use(express.urlencoded({ extended: false }));

// app.use(express.json());
app.use(cors());

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Tom",
    text: "Message two! - if you are seeing this as the first message, latest 10 only shown!",
  },
  {
    id: 2,
    from: "Bart",
    text: "Message three!",
  },
  {
    id: 3,
    from: "Tom",
    text: "Message four!",
  },
  {
    id: 4,
    from: "Bart",
    text: "Message five!",
  },
  {
    id: 5,
    from: "Tom",
    text: "Message six!",
  },
  {
    id: 6,
    from: "Bart",
    text: "Message seven!",
  },
  {
    id: 7,
    from: "Tom",
    text: "Message eight!",
  },
  {
    id: 8,
    from: "Bart",
    text: "Message nine!",
  },
  {
    id: 9,
    from: "Tom",
    text: "Message ten!",
  },
  {
    id: 10,
    from: "Tom",
    text: "Message eleven!",
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = welcomeMessage;

// Display root directory, input controls
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

// http://localhost:3001/messages/search?text=the
// Get messages containing input string
app.get("/messages/search", (req, res) => {
  const searchTerm = req.query.text.toUpperCase();

  const filteredMessages = messages.filter((message) => {
    return message.text.toUpperCase().includes(searchTerm);
  });

  res.status(200).json(filteredMessages);
});

// Get the last 10 messages
app.get("/messages/latest", (req, res) => {
  const lastTenMessages = messages.slice(-10);

  if (messages.length >= 10) {
    res.status(200).json(lastTenMessages);
  } else {
    res.status(404).send("Not enough messages");
  }
});

// Get message by id
app.get("/messages/:id", (req, res) => {
  const message = messages[req.params.id];

  if (!message) {
    res.status(404).send(`Message with id: ${req.params.id} not found`);
  } else {
    res.status(200).json(messages[req.params.id]);
  }
});

// Add new message, check for empty field and respond with appropriate feedback
app.post("/messages", (req, res) => {
  const newMessage = {
    id: uuidv4(),
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date().toLocaleTimeString(),
  };

  const from = req.body.from;
  const text = req.body.text;

  if (from || text) {
    messages.push(newMessage);
    res.status(200).send("Message sent.");
  } else {
    res.status(400).send("No message to send or recipient not set.");
  }
});

app.listen(process.env.PORT || 4002, () => {
  console.log("Server running on port 4002");
});
