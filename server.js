const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let updateId = 0;
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//read all messages
app.get("/messages", function (req, res) {
  res.json(messages);
});

//creating a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: updateId++,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from && !newMessage.text) {
    res.status(400).json({ msg: "A name and a message is required" });
  }
  
  messages.push(newMessage);
  res.status(200).json(messages);
});

//read messages whose text contains a given substring
app.get("/messages/search", (req, res) => {
  let filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(req.query.text.toLowerCase())
  );
  if (filteredMessages.length > 0) {
    res.status(200).json(filteredMessages);
  } else {
    res
      .status(404)
      .json({ msg: `No message containing the word ${req.query.text}` });
  }
});

//read the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  res.status(200).json(messages.splice(-10));
});

//read one message specified by ID
app.get("/messages/:id", (req, res) => {
  const filteredMsg = messages.filter(
    (message) => message.id == parseInt(req.params.id)
  );

  if (filteredMsg.length > 0) {
    res.status(200).json(filteredMsg);
  } else {
    res
      .status(400)
      .send({ msg: `No message with id ${req.params.id} has been found` });
  }
});

app.delete("/messages/:id", (req, res) => {
  const index = messages.findIndex(
    (message) => message.id === parseInt(req.params.id)
  );

  if (index < 0) {
    res.status(404).json({ msg: `No message with ${req.params.id}` });
  }

  messages.splice(parseInt(req.params.id), 1);
  res.status(200).json(messages);
});

const listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
