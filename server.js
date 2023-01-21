const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  const correctMessageForm = !!req.body.text && !!req.body.from;
  if (correctMessageForm) {
    messages.push(newMessage);
    res.status(201).send(messages);
  } else {
    res.status(400).send("Incorrect format");
  }
});

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

app.get("/", function (req, res) {
  res.status(200).send("please insert message");
});

app.get("/messages", function (req, res) {
  res.send(messages);
});

app.get("/messages/search", function (req, res) {
  const querySearch = req.query.text;
  const filterMessage = messages.filter(
    (message) =>
      message.text.includes(querySearch) || message.from.includes(querySearch)
  );
  res.send(filterMessage);
});

app.get("/messages/latest", function (req, res) {
  res.send(messages.slice(-10));
});

app.get("/messages/:id", function (req, res) {
  const idSearch = Number(req.params.id);
  const message = messages.find((message) => message.id === idSearch);
  res.status(200).json(message);
});

app.delete("/messages/:id", function (req, res) {
  const idToDelete = Number(req.params.id);
  const messageIndex = messages.findIndex(
    (message) => message.id === idToDelete
  );
  if (messageIndex === -1) {
    res.status(404).send("incorrect ID");
  } else {
    messages.splice(messageIndex, 1);
    res.send(messages);
  }
});

const PORT = 5000;
app.listen(PORT, function () {});
