const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.json("Hello World");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.get("/messages/:id", function (req, res) {
  let id = req.params.id;
  let foundMessage = messages.filter((i) => i.id == id);

  res.json(foundMessage);
});

app.delete("/message/:id", function (req, res) {
  let id = parseInt(req.params.id);

  let foundMessage = messages.filter((i) => i.id == id);

  if (foundMessage) {
    res.json({ "All messages": messages.filter((i) => i.id !== id) });
  }
});

//reject requests to create messages if the message objects have an empty or missing text or from property.
//In this case your server should return a status code of 400.

app.post("/message", function (req, res) {
  const { from, text } = req.body;
  const newMessage = {
    id: messages.length,
    from,
    text,
  };

  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json("Please include a from and text in message");
  } else {
    messages.push(newMessage);
    res.json(messages);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
