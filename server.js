const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//Send a new message
app.post("/messages", (req, res) => {
  if (!req.body.from || !req.body.text) {
    res
      .status(400)
      .send("Please enter a value to both 'name' and 'message' sections");
  } else {
    const newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
    };
    messages.push(newMessage);
    res.json(messages);
  }
});

// Delete a message by id

app.delete("/messages/delete/:id", (req, res) => {
  const id = req.params.id;
  const index = messages.findIndex((message) => message.id === id);
  console.log(index);
  if (index) {
    messages.splice(index, 1);
    res.json({ msg: `Message with id ${id} deleted`, messages });
  } else {
    res.status(400).send("Enter an Id number to delete a message");
  }
});

//Read one message by id

app.get("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  const chosenMsg = messages.find((message) => message.id === messageId);
  if (chosenMsg !== undefined) {
    res.json(chosenMsg);
  } else {
    res.status(400).send("Sorry, no message for that...");
  }
});

const PORT = 8080;
app.listen(process.env.PORT || PORT);
