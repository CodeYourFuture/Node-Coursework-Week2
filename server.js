const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); // before our routes definition
app.use(cors());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Joe",
    text: "New Message!",
  },
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//[2] read all messages
app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});
//[3] read one message specified by id
app.get("/messages/:messageId", (req, res) => {
  const messageId = parseInt(req.params.messageId);
  const foundMessage = messages.find((messageItem) => {
    return messageItem.id === messageId;
  });
  res.json(foundMessage);
});
//[1] create a new message,post and validate(level 1, 2)
app.post("/messages", function (req, res) {
  const newMessage = req.body;
  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json({ message: "please do it again" });
  } else {
    newMessage.id = messages.length;
    messages.push(newMessage);
    return res.json(messages);
  }
});

// [4]delete a message by id
app.delete("/messages/:messageId", function (req, res) {
  const messageId = parseInt(req.params.messageId);
  messages = messages.filter((messageItem) => {
    return messageItem.id !== messageId;
  });
  res.json({ message: `message${messageId} deleted`, messages });
});
//level 3 [1]Read only messages whose text contains a given substring:
app.get("/messages/search", (req, res) => {
  const { term } = req.query;
  console.log(term);

  const filterMessages = messages.filter((message) => {
    message.text.toLowerCase().includes(term.toLowerCase());
  });
  console.log(filterMessages);
  res.send(filterMessages);
});

//level 3 [2]read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  const filterMessages = messages.filter(
    (message, index) => messages.length - 10 <= index
  );
  res.send(filterMessages);
});

//app.listen(process.env.PORT);
app.listen(3001, () => {
  console.log("The server is running on port 3001");
});
