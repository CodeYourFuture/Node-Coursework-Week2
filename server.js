const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.get("/messages/search", (req, res) => {
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

app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  messages = messages.filter((message) => message.id === Number(id));
  res.status(200).send(messages);
});

app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
});

app.post("/messages", (req, res) => {
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

app.listen(process.env.PORT);
