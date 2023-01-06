const express = require("express");
const cors = require("cors");

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
let maxID = Math.max(...messages.map((c) => c.id));

//validation function
function validateInputData(name, text, res) {
  if (!name || !text) {
    res.status(400).send("Please add all fields");
    return;
  }
}

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//Read all messages by search item
app.get("/messages/search", (req, res) => {
  if (!req.query.text) {
    res.status(400).send("Please add search item");
    return;
  }
  let searchedMessages = messages.filter((msg) =>
    msg.text.includes(req.query.text)
  );
  if (searchedMessages.length === 0) {
    res.status(404).json({ msg: `Message not found` });
    return;
  }
  res.json(searchedMessages);
});

//Read latest 10 messages
app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.slice(-10).reverse();
  res.json(latestMessages);
});

//Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  let chatID = parseInt(req.params.id);
  let chats = messages;
  let message = chats.find((c) => c.id === chatID);
  if (!message) {
    res.status(404).json({ msg: `Message not found with the id ${chatID}` });
    return;
  }
  res.json(message);
});

// Create a new message
app.use(express.json());
app.post("/messages", (req, res) => {
  validateInputData(req.body.from, req.body.text, res);
  const newMessage = {
    id: ++maxID,
    from: req.body.from,
    text: req.body.text,
    timSent: new Date(),
  };
  messages.push(newMessage);
  res.json(messages);
});

//Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const chatID = parseInt(req.params.id);
  const chatIndex = messages.findIndex((c) => c.id === chatID);
  if (chatIndex < 0) {
    res.status(404).json({ msg: `Message not found with the id ${chatID}` });
    return;
  }
  messages.splice(chatIndex, 1);
  res.json({ msg: "chat deleted", messages });
});

//Update one message by id
app.put("/messages/:id", (req, res) => {
  const found = messages.some((msg) => msg.id === parseInt(req.params.id));
  if (found) {
    const updateMessage = req.body;
    messages.forEach((msg) => {
      if (msg.id === parseInt(req.params.id)) {
        msg.from = updateMessage.from ? updateMessage.from : msg.from;
        msg.text = updateMessage.text ? updateMessage.text : msg.text;
        res.json({ result: "Message is updated", messages });
        return;
      }
    });
  }
  res
    .status(404)
    .json({ msg: `Message is not found with the id ${req.params.id}` });
});

app.listen(process.env.PORT || 5000);
