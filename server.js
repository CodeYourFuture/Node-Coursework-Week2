const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

// This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let nextMessageId = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  // Adding timestamp to each message
  const timeSent = new Date();

  // reject requests to create messages if the message objects have an empty or missing text or from property.
  if (!from || !text || from.trim() === "" || text.trim() === "") {
    res.status(400).send("Missing required property: from or text");
    return;
  }

  const newMessage = {
    id: nextMessageId++,
    from,
    text,
    timeSent,
  };
  messages.push(newMessage);

  res.json(messages);
});

// Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages", (req, res) => {
  const { search, latest } = req.body;

  // Filtering messages by search text
  let filteredMessages = messages;

  if (search) {
    const searchText = search.toLowerCase();
    filteredMessages = messages.filter((msg) =>
      msg.text.toLocaleLowerCase().includes(searchText)
    );
  }

  // Limit messages to 10 most recent
  let limitedMessages = filteredMessages.slice(-10);

  // reverse messages so that most recent appear first
  limitedMessages = limitedMessages.reverse();

  res.json(limitedMessages);
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).send("Message not found");
  }
});

// Update a message by ID
app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { from, text } = req.body;

  const messageIndex = messages.findIndex((message) => message.id === id);

  if (messageIndex === -1) {
    res.status(404).send("Message not found");
    return;
  }

  const updatedMessage = {
    ...messages[messageIndex],
    from: from || messages[messageIndex].from,
    text: text || messages[messageIndex].text,
  };

  messages(messageIndex) = updatedMessage;

  res.json(updatedMessage)
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index >= 0) {
    messages.splice(index, 1);
    res.status(204).send("Message has been deleted");
  } else {
    res.status(404).send("Message not found");
  }
});

// app.listen(process.env.PORT);

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
