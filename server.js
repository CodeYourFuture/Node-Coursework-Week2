const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.get("/messages/:messageId", function (req, res) {
  res.json(messages.find((message) => message.id === +req.params.messageId));
});

app.delete("/messages/:messageId", function (req, res) {
  messages.filter((message) => message.id !== +req.params.messageId);
  res.json(`message with ${req.params.messageId} deleted`);
});

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  newMessage.id = messages.length;
  messages.push(newMessage);
  res.json(newMessage);
});

const listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
