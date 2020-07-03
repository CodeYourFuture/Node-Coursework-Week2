const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let messages = require("./Messages");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// main route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// the route which shows all massages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//this function generate a specific random id
const randId = () => {
  return Math.floor(Math.random() * 1000000000);
};

// the route which add on message
app.post("/messages/add", (req, res) => {
  if (req.body.from && req.body.text) {
    const name = req.body.from;
    const messageText = req.body.text;
    const id = randId();
    const timeSent = new Date();

    const message = {
      id: id,
      from: name,
      text: messageText,
      timesent: timeSent,
    };
    messages.push(message);
    res.send(message);
  } else {
    res.statusCode = 406;
    res.send("please write a message with your name");
  }
});

//this is the route which updates the messages
app.put("/messages/:id", (req, res) => {
  if (req.params.id) {
    const messageId = Number(req.params.id);
    const name = req.body.from;
    const messageText = req.body.text;
    const found = messages.some((message) => message.id === messageId);
    if (found) {
      messages.map((message) => {
        if (message.id === messageId) {
          name ? (message.from = name) : null;
          messageText ? (message.text = messageText) : null;
        }
      });
      res.send(messages);
    } else {
      res.send("please enter a valid id to update");
    }
  }
});

//the route which search the messages by text
app.get("/messages/search", (req, res) => {
  const text = req.query.text;
  if (text) {
    const message = messages.filter((message) =>
      message.text.toLowerCase().includes(text.toLowerCase())
    );
    res.send(message);
  } else {
    res
      .status(400)
      .send("please enter a value for property 'text' to fine the messages");
  }
});

//this route shows the most recent 1 messages
app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(messages.length - 10, messages.length));
});

// the route which shows one massage by id
app.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const message = messages.find((message) => message.id === messageId);
  res.send(message);
});

// the route which delete one massage by id
app.delete("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  messages = messages.filter((message) => message.id !== messageId);
  res.send(messages);
});

const myport = process.env.PORT || 5000;
app.listen(myport, () => console.log("your app is listening ", myport));
