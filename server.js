const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: "0",
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage, {
  id: "1",
  from: "Homer",
  text: "Welcome to CYF chat system!",
}, {
  id: "2",
  from: "Marge",
  text: "Welcome to CYF chat system!",
}, {
  id: "3",
  from: "Lisa",
  text: "Welcome to CYF chat system!",
}, {
  id: "4",
  from: "Maggie",
  text: "Welcome to CYF chat system!",
}, {
  id: "5",
  from: "Grandpa",
  text: "Welcome to CYF chat system!",
}, {
  id: "6",
  from: "Ned Flanders",
  text: "Welcome to CYF chat system!",
}, {
  id: "7",
  from: "Milhouse",
  text: "Welcome to CYF chat system!",
}, {
  id: "8",
  from: "Principal Skinner",
  text: "Welcome to CYF chat system!",
}, {
  id: "9",
  from: "Apu",
  text: "Welcome to CYF chat system!",
}, {
  id: "10",
  from: "Krusty",
  text: "Welcome to CYF chat system!",
} ];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.post("/messages", function (req, res) {
  const newMessage = {
    id: uuid.v4(),
    from: req.body.from,
    text: req.body.text,
    timeSent: new DateTime()
  };
  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json(`Please include a name and message`);
  }
  messages.push(newMessage);
  res.json(messages);
});

app.get("/messages/latest", function (req, res) {
  let latestMessages = [];

  if (messages.length <= 10) {
    res.json(messages);
  } else if (messages.length > 10){
    for (let i = messages.length-10; i < messages.length; i++) {
      latestMessages.push(messages[i]);
    }
    res.json(latestMessages);
  }
});

app.get("/messages/search", function (req, res) {
  const searchQuery = req.query.text;
  messages.filter(message => {
    if (message.text.includes(searchQuery)) {
      return res.json(message);
    } else {
      return res.status(400).send(`There are no messages containing "${req.query.text}"`);
    }
  });
});

app.get("/messages/:messageId", function (req, res) {
  const requestedMessage = messages.filter(message => message.id === req.params.messageId);
  res.json(requestedMessage);
});

app.delete("/messages/:messageId", function (req, res) {
  const found = messages.some(
    message => message.id === req.params.messageId
  );
  if (found) {
    res.json(
      messages.filter(message => message.id !== req.params.messageId)
    );
  } else {
    res.status(400).send(`There's no message with ${req.params.messageId}`);
  }
});

const listener = app.listen(62438, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
