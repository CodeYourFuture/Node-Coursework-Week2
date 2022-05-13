const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

let messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.json("I am here!");
});

// Search text in messages -  /messages/search?text=express
app.get("/messages/search", (req, res) => {
  const {text }= req.query;
  const filteredMessages = messages.filter((message) =>
   message.text.includes(text));
  res.json(filteredMessages);
});

// get last 10 messages -  /messages/latest
app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
});


// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id)
  );
  res.json(message);
});

//  Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  messages = messages.filter((message) => message.id !== Number(req.params.id));
  res.json(messages);
});

// Create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const newMessageObject = { id: messages.length, from, text };

  if (from === undefined || from === "" || text === undefined || text === "") {
    return res
      .status(400)
      .send(`Your message has empty or missing text or from property.`);
  }

  messages.push(newMessageObject);
  res.json(messages);
});

app.listen(9000, () => "app now listening on port 9000");
