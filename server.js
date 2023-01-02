const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: "0",
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
app.post("/messages", (req, res) => {

  if (!req.body.from || !req.body.text) {
    res.status(400).send("from must be valid");
    return;
  }

  // build our new resourse
  const newMessage = req.body;
  newMessage.id = uuidv4();
  messages.push(newMessage);
  res.status(201).json(newMessage);
});
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const msg = messages.find((message) => message.id === id);
  if (msg === undefined) {
    res.send("message not found");
  }

  res.send(msg);
});
app.delete("/messages/:id", (req, res) => {
  // validate your input
  const id = req.params.id;
  const msg = messages.find((message) => message.id === id);
  if (msg === undefined) {
    res.status(404).send("message not found");
  }
  const messageIndex = messages.findIndex((m) => m.id === id);
  messages.splice(messageIndex, 1);
  res.send("message deleted");
  res.send("message deleted");
});
const port = 3131;

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
// app.listen(process.env.PORT);
