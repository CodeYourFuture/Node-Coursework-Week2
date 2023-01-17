const express = require("express");
const cors = require("cors");

const app = express();

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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//  Create a new message
app.use(express.json());



app.post("/messages", function (req, res) {
  const newMsg = req.body;
  // Level 2 - simple validation
  if (
    !newMsg.from ||
    !newMsg.text
  ) {
    res.status(400).send("Rejected: empty or missing text or from property.");
  } else {
    messages.push(newMsg);
    res.status(201).send(`Request accepted`);
  }
});

//  Read all messages
app.get("/messages", function (req, res) {
  res.status(200).send({ messages });
});

//  Read one message specified by an ID
app.get("/messages/:msgId", function (req, res) {
  const idToFind = Number(req.params.msgId);
  const msg = messages.find((msg) => msg.id === idToFind);
  res.status(200).send({ msg });
});

//  Delete a message, by ID
app.delete("/messages/:msgId", function (req, res) {
  const idToDel = Number(req.params.msgId);
  const indexToDel = messages.findIndex((msg) => msg.id === idToDel);
  if (indexToDel >= 0) {
    messages.splice(indexToDel, 1);
  }
  res.status(200).send({ messages });
});

app.listen(3031, function (req, res) {
  console.log("Server is running on port 3031...");
});
