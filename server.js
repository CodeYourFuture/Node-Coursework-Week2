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

//Read all messages
app.get("/messages", function (req, res) {
  res.status(200).send(messages);
});

// Read only messages whose text contains a given substring /messages/search?text=express
app.get("/messages/search", function (req, res) {
  const searchTerm = req.query.text.toLowerCase();
  const foundedMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm)
  );
  res.status(200).send(foundedMessages);
});

//Read only the most recent 10 messages
app.get("/messages/latest", function (req, res) {
  const latestMessages = messages.slice(-10);
  res.status(200).send(latestMessages);
});

//Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const userId = Number(req.params.id);
  const foundedMessage = messages.find((message) => message.id === userId);
  res.status(200).send(foundedMessage);
});

//Create a new message
app.post("/messages", function (req, res) {
  const { text, from } = req.body;

  //checking if the message objects have an empty or missing text or from property
  if (!text || !from || text.trim() === "" || from.trim() === "") {
    return res
      .status(400)
      .json({ error: "text and from properties are required" });
  } else {
    const newMessage = {
      from: from,
      text: text,
      timeSent: new Date().toISOString(), // adding timestamp using Date object
    };

    messages.push(newMessage);
    res.status(201).send(newMessage);
  }
});

//update a message's text or from property
app.put("/messages/:id", function (req, res) {
  const searchId = Number(req.params.id);
  const newFrom = req.body.from;
  const newText = req.body.text;

  const messageToUpdate = messages.find((message) => message.id === searchId);

  if (!messageToUpdate) {
    res.status(404).send("Message is not found");
    return;
  }

  //if newText is provided, it will update the text property to that value.
  // If newText is not provided or is a falsy value, it will keep the existing text value.
  messageToUpdate.from = newFrom || messageToUpdate.from;
  messageToUpdate.text = newText || messageToUpdate.text;
  res.status(200).send(messageToUpdate);
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
