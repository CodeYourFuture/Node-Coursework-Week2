const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
let messages = require("./messages.json");
app.use(cors());

app.use(bodyParser.json());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// GET all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//POST message
app.post("/messages", function (req, res) {
  if (req.body.text && req.body.from) {
    const messageTime = new Date();
    const newMessage = { ...req.body, timeSent: messageTime };
    messages.push(newMessage);
    res.send({ success: true, newMessage });
  } else {
    res.send(400, "Message could not send !");
  }
});

//Find message by searched text
app.get("/messages/search", (req, res) => {
  const searchedText = req.query.text;
  const filteredMessage = messages.filter((item) =>
    item.text.toLowerCase().includes(searchedText.toLowerCase())
  );
  if (filteredMessage.length < 1) {
    res.sendStatus(404);
  } else {
    res.json(filteredMessage);
  }
});

// GET last ten messages
app.get("/messages/last_ten", (req, res) => {
  res.json(_.takeRight(messages, 10));
});

////GET message by its ID
app.get("/messages/:id", function (req, res) {
  const searchedId = req.params.id;
  const message = messages.filter((message) => message.id == searchedId);

  if (message.length > 0) {
    res.json(message);
  } else {
    res.sendStatus(404);
    console.log("Searched message by id can't found");
  }
});

//DELETE a message by its ID
app.delete("/messages/delete/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  const length = messages.length;
  messages = messages.filter((item) => item.id != idToDelete);
  if (messages.length < length) {
    const notification = `Message ${idToDelete} deleted`;
    res.json({ success: true, notification });
  } else {
    const notification = `Message ${idToDelete} can not found`;
    res.json({ success: false, notification });
  }
});

app.listen(process.env.PORT || 5000);
