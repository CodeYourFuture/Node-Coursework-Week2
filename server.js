const express = require("express");
const cors = require("cors");
const port = 3030;

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
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Create a new message
app.post("/messages", function (req, res) {
  const newUser = req.body;
  messages.push(newUser);
  res.status(201).send(newUser);
});

//Read all messages
app.get("/messages", function (req, res) {
  res.status(200).send(messages);
});

//Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const userId = Number(req.params.id);
  const foundedMessage = messages.find((message) => message.id === userId);
  res.status(200).send(foundedMessage);
});

//Delete a message, by ID
app.delete("/messages/:id", function (req, res) {
  const userId = Number(req.params.id);
  messages.forEach((message) => {
    if (message.id === userId) {
      const index = messages.indexOf(message);
      messages.splice(index, 1);
    }
  });
  res.status(204).send("The message was deleted");
});

app.listen(port, () => {
  console.log("Listening to the port 3030...");
});
