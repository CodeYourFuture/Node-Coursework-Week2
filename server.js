const express = require("express");
const cors = require("cors");
const port = 3030;

const app = express();

app.use(express.json());

app.use(cors());

const messages = require("./messages.json");

//for creating new Id for new message
function getNewUniqueId(array) {
  let newId;
  do {
    newId = Math.floor(Math.random() * 1000) + 1; // generate a random number between 1 and 1000
  } while (array.some((obj) => obj.id === newId)); // check if the id already exists in the array
  return newId;
}

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
  console.log(foundedMessages);
  res.status(200).send(foundedMessages);
});

//Read only the most recent 10 messages
app.get("/messages/latest", function (req, res) {
  const latestMessages = messages.slice(-10);
  res.status(200).send(latestMessages);
});

//Read all messages specified by name
app.get("/messages/name/:name", function (req, res) {
  const userName = req.params.name.toLowerCase();
  const foundedMessage = messages.filter(
    (message) => message.from.toLowerCase() === userName
  );
  res.status(200).send(foundedMessage);
});

//Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const userId = Number(req.params.id);
  const foundedMessage = messages.find((message) => message.id === userId);
  res.status(200).send(foundedMessage);
});

//Create a new message
app.post("/messages", function (req, res) {
  const { from, text } = req.body;

  //checking if the message objects have an empty or missing text or from property
  if (!text || !from || text.trim() === "" || from.trim() === "") {
    return res
      .status(400)
      .json({ error: "text and from properties are required" });
  } else {
    const newMessage = {
      id: getNewUniqueId(messages),
      from: from,
      text: text,
      timeSent: new Date(), // adding timestamp using Date object
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
