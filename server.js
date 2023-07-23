const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

// This array is our "data store".
// We will start with one message in the array.
// Note: messages will be lost when Glitch restarts our server.
const messages = [
  welcomeMessage,
  {
    id: 1,
    from: "BAki",
    text: "CAn you see me?",
  },
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.send({ messages });
});

// Send a message
app.post("/messages", (request, response) => {
  let newMessage = request.body;
  if (
    newMessage.id === "" ||
    newMessage.from === "" ||
    newMessage.text === ""
  ) {
    console.error("Invalid message:", newMessage);
    response.status(400).send("Bad Request");
  } else {
    messages.push(newMessage);
    response.send("Message posted successfully");
  }
});

// Get messages containing the search word
app.get("/messages/search", (request, response) => {
  let searchWord = request.query.text;
  response.send(getMessagesFromSearch(messages, searchWord));
});

// Get the 10 latest messages
app.get("/messages/latest", (request, response) => {
  response.send(getLatestMessages(messages));
});

// Get one message by ID
app.get("/messages/:id", (request, response) => {
  let messageId = request.params.id;
  response.send(getMessageByID(messages, messageId));
});

// Delete message by ID
app.delete("/messages/:id", (request, response) => {
  let messageId = request.params.id;
  response.send(deleteMessageByID(messages, messageId));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}...`);
});

// Helper function to get a message by ID
const getMessageByID = (messages, id) => {
  return messages.filter((message) => message.id == id);
};

// Helper function to delete a message by ID
const deleteMessageByID = (messages, id) => {
  let messageIndex = messages.findIndex((message) => message.id == id);

  if (messageIndex > -1) {
    messages.splice(messageIndex, 1);
  }
  return messages;
};

// Helper function to get messages containing the search word
const getMessagesFromSearch = (messages, word) => {
  return messages.filter((message) =>
    message.text.toLowerCase().includes(word.toLowerCase())
  );
};

// Helper function to get the 10 latest messages
const getLatestMessages = (messages) => {
  return messages.slice(Math.max(messages.length - 10, 0));
};

app.listen(3000, ()=>{
  console.log("3000")
})