const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const messages = [];
let nextMessageID = 0;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  if (req.body.from !== "" && req.body.text !== "") {
    nextMessageID++;
    const message = {};
    message.id = nextMessageID;
    message.from = req.body.from;
    message.text = req.body.text;
    message.timeSent = new Date().toString();
    messages.push(message);
    res.send(messages);
  } else {
    res.sendStatus(400);
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/search", (req, res) => {
  const searchText = messages.filter((message) =>
    message.text.includes(req.query.text)
  );
  res.json(searchText);
});

app.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const messageByID = messages.filter((message) => message.id == id);
  res.json(messageByID);
});

app.put("/messages/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const messageIndex = messages.findIndex((message) => message.id === id);
  messages[messageIndex].text = req.body.text;
  res.json(messages[messageIndex]);
});

app.delete("/message/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleteMessageByID = messages.filter((message) => message.id !== id);
  res.json(deleteMessageByID);
});

app.get("/messages/latest/:number", (req, res) => {
  const number = Number(req.params.number);
  if (messages.length >= number) {
    const latestMessages = messages.slice(-number);
    res.json(latestMessages);
  } else {
    res.json(messages);
  }
});

app.listen(port, () => {
  console.log("Server is listening to the port 3000...");
});
