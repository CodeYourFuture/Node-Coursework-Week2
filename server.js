const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = require("./messages.json");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/search", (req, res) => {
  const searchText = req.query.text ? req.query.text.toLowerCase() : null;
  const searchFrom = req.query.from.toLowerCase();
  const searchMsgs = messages.filter(
    (message) =>
      message.text.toLowerCase().includes(searchText) ||
      message.from.toLowerCase().includes(searchFrom)
  );
  res.send(searchMsgs);
});

app.get("/messages/latest", (req, res) => {
  const latestMsgs = messages.slice(messages.length - 2, messages.length - 1);
  res.send(latestMsgs);
});

app.get("/messages/:id", (req, res) => {
  const inputId = req.params.id;
  if (inputId) {
    const welcome = messages.filter((message) => message.id == inputId);
    res.send(inputId);
  }
});

app.post("/messages", (req, res) => {
  if (req.body.from && req.body.text) {
    const newMsg = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
    };
    messages.push(newMsg);
    res.status(200).send(newMsg);
  } else {
    res.status(400).send("Please enter a name and message to proceed");
  }
});

app.delete("/messages/:id", (req, res) => {
  const inputId = req.params.id;
  if (inputId) {
    messages = messages.filter((message) => message.id != inputId);
    res.send(messages);
  }
});

app.listen(process.env.PORT);
