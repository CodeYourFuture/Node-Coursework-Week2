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
  messageTime = new Date();
  if (!req.body.from || !req.body.text) {
    res.status(400).send("Please fill out both 'name' and 'message' sections");
  } else {
    const newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
      timeSent: messageTime,
    };
    messages.push(newMessage);
    res.json(messages);
  }
});

app.put("/messages/id", (req, res) => {
  const updMessage = req.body;
  messages.forEach((message) => {
    if (message.id === parseInt(req.params.is)) {
      message.from = updMessage.from ? updMessage.from : message.from;
      message.text = updMessage.text ? updMessage.text : message.text;

      res.json({ msg: `message with id ${message.id} updated`, message });
    } else {
      res
        .status(400)
        .json({ msg: `No member with the id of ${req.params.id}` });
    }
  });
});

// Read one message by id

app.get("/messages/:messageId", (req, res, next) => {
  const messageId = Number(req.params.messageId);
  const chosenMsg = messages.find((message) => message.id === messageId);
  if (chosenMsg !== undefined) {
    res.json(chosenMsg);
  } else {
    next();
  }
});

// Delete a message by id

app.delete("/messages/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = messages.findIndex((message) => message.id === id);
  if (index !== undefined) {
    messages.splice(index, 1);
    res.json({ msg: `Message with id ${id} deleted`, messages });
  } else {
    res.status(404).send("Enter an Id number to delete a message");
  }
});

// app.delete("/messages/delete/:id", (req, res) => {
//   const msgId = Number(req.params.id);
//   messages = messages.filter((message) => message.id !== msgId);
//   res.json({ "Message deleted": true });
// });

// Read searched messages only

app.get("/messages/search", (req, res) => {
  const searchText = req.query.text;
  res.json(messages.filter((message) => message.text.includes(searchText)));
});

// Read most recent 3 messages

app.get("/messages/latest", (req, res) => {
  messages.slice(-3);
  res.json({
    msg: `you are seing most recent ${messages.length} messages`,
    messages,
  });
});

// app.put("/messages/id", (req, res) => {
//   const updMessage = req.body;
//   messages.forEach((message) => {
//     if (message.id === parseInt(req.params.is)) {
//       message.from = updMessage.from ? updMessage.from : message.from;
//       message.text = updMessage.text ? updMessage.text : message.text;

//       res.json({ msg: `message with id ${message.id} updated`, message });
//     }
//   });
// });

const PORT = 8080;
app.listen(process.env.PORT || PORT);
