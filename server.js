const express = require("express");
const cors = require("cors");
const port = 3000;
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
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date(),
  };

  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json({
      status: "fail",
      message: "the message objs have an empty or missing property",
    });
  }

  messages.push(newMessage);
  res.status(201).send({ newMessage });
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

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on PORT ${process.env.PORT}...`);
// });

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
  const lowerCaseWord = word.toLowerCase();
  return messages.filter(({ text }) =>
    text.toLowerCase().includes(lowerCaseWord)
  );
};


// Helper function to get the 10 latest messages
const getLatestMessages = (messages) => {
  return messages.slice(Math.max(messages.length - 10, 0));
};

app.listen(port, ()=> {
  console.log('Listening')
})