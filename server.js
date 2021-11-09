const express = require("express");
const cors = require("cors");

// Import library to generate random id's.
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

// Required when POST comes from a form
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Tom",
    text: "Welcome to CYF chat system!",
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = welcomeMessage;

// Display root directory, input controls
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Get all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// Get message by id
app.get("/messages/:id", (req, res) => {
  res.send(messages[req.params.id]);
});

// Add new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: uuidv4(),
    from: req.body.from,
    text: req.body.text,
  };

  const from = req.body.from;
  const text = req.body.text;
  if (from.length > 0 || text.length > 0) {
    messages.push(newMessage);
    res.status(200).send(`Message sent to ${from}.`);
  } else {
    res.status(400).send("No message to send or recipient not set.");
  }
});

app.listen(process.env.PORT || 3001);
