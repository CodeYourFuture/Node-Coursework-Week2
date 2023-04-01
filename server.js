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

app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

app.get("/messages/:messageId", (req, res) => {
  const messageId = parseInt(req.params.messageId);
  const foundMessage = messages.find((messageItem) => {
    return messageItem.id === messageId;
  });
  res.json(foundMessage);
});
//post and validate(level 1, 2)
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

// delete
app.delete("/messages/:messageId", function (req, res) {
  const messageId = parseInt(req.params.messageId);
  messages = messages.filter((messageItem) => {
    return messageItem.id !== messageId;
  });
  res.json({ message: `message${messageId} deleted`, messages });
});

//app.listen(process.env.PORT);
app.listen(3001, () => {
  console.log("The server is running on port 3001");
});
