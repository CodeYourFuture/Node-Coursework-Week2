const express = require("express");
const cors = require("cors");
const app = express();

//load the Message
const messageLists = require("./MessageData.js");

// changing string to json the body
app.use(express.json());

app.use(cors());

// Our first server page
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// adding  new messages
app.post("/messages", function (req, res) {
  let newMessage = req.body;
  //  this will check if id is provide, exists already, if all false it will add to the message array.
  if (!newMessage.text) {
    res.status(400);
    res.send("Message Text required");
  } else if (
    messageLists.find((message) => message.id == parseInt(newMessage.id))
  ) {
    res.status(400);
    res.send("Message already exists");
  } else {
    messageLists.push(newMessage);
    res.status(201);
    console.log(newMessage);
    res.send(newMessage);
  }
});

//showing/reading   all the messages in the server
app.get("/messages", function (request, response) {
  response.json(messageLists);
});

// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);

  let filteredMessages = messageLists.find(
    (singleMessage) => singleMessage.id === id
  );

  if (!filteredMessages) {
    res.sendStatus(404);
  }
  res.send(filteredMessages);
});

//deleting message by id
app.delete("/messages/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let deletedMessageIndex = messageLists.findIndex(
    (message) => message.id === id
  );
  if (deletedMessageIndex > -1) {
    messageLists.splice(deletedMessageIndex, 1);
    // res.send("Album Successfully deleted");
    res.status(204);
  } else {
    res.sendStatus(404);
  }
});

//searching messages
app.get("/messages/search", function (request, response) {
  let text = request.query.text;
  console.log(request.query.text);

  if (!text) {
    return response.sendStatus(404);
  }
  text = text.toLowerCase();
  let filteredMessage = messageLists.filter((message) =>
    message.text.toLowerCase().includes(text)
  );
  response.json(filteredMessage);
});

//Latest 10 messages messages
app.get("/messages/latest", function (request, response) {
  if (messageLists.length <= 10) {
    response.json(messageLists);
  } else {
    latestMsgArr = messageLists.slice(-10);
    response.json(latestMsgArr);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on ${port}`));
