const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const welcomeMessage = {
  id: 23,
  from: "Mohammad",
  text: "Welcome to CYF chat system!",
};

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

let messages = [welcomeMessage];

app.get("/messages/search", (req, res) => {
  res.json("test");
  const { term } = req.query;
  console.log(term);

  const filterMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(term.toLowerCase())
  );
  console.log(filterMessages);
  res.send(filterMessages);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/latest", (req, res) => {
  const filterMessages = messages.filter(
    (message, index) => messages.length - 10 <= index
  );
  res.send(filterMessages);
});

app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  messages = messages.filter((message) => message.id === Number(id));
  res.status(200).send(messages);
});

app.post("/messages", (req, res) => {
  console.log(req.body);
  const { from, text } = req.body;
  const ourMessageObject = {
    id: Date.now(),
    from,
    text,
    timeSent: new Date().toLocaleDateString(),
  };
  messages.push(ourMessageObject);
  res.send("Message received successfully.");
});

app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id !== Number(id));
  res.json(messages);
});

app.put("/messages/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  let updatedMessage;
  messages = messages.map((message) => {
    if (message.id === Number(id)) {
      updatedMessage = { ...message, text };
      return updatedMessage;
    }
    return message;
  });

  if (updatedMessage) {
    res.status(200).send(updatedMessage);
  } else {
    res.status(404).send("Message not found");
  }
});

const listener = app.listen(3002, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
