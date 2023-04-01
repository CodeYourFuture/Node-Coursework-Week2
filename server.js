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

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  newMessage.id = messages.length;
  messages.push(newMessage);
  res.json("messageCreate");
});
// notice .delete
app.delete("/messages/:messageId", function (req, res) {
  const messageId = parseInt(req.params.messageId);
  messages = messages.filter((messageItem) => {
    return messageItem.id !== messageId;
  });
  res.json("message deleted");
});

//app.listen(process.env.PORT);
app.listen(3001, () => {
  console.log("The server is running on port 3001");
});
