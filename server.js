const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

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

//All messages
app.get("/messages", function (request, response) {
  response.status(200).json(messages);
});

//Get One message by ID
app.get("/messages/:id", function (request, response) {
  let message = messages.find((msg) => msg.id === request.params.id);
  if (message) {
    response.status(200).json(message);
  } else {
    response.status(400).json({
      msg: "Message with an ID " + request.params.id + " doesn't exist",
    });
  }
});

//Put one message by ID
app.put("/messages/:id", function (request, response) {
  let messageIndex = messages.findIndex((msg) => msg.id === request.params.id);
  if (messageIndex < 0) {
    response.status(400).json({
      msg: "Message with an ID " + request.params.id + " doesn't exist",
    });
  }
  if (request.body.text) {
    messages[messageIndex].text = request.body.text;
  }
  if (request.body.from) {
    messages[messageIndex].from = request.body.from;
  }
  response.status(200).json(messages);
});

//Search messages
app.get("/messages/search", function (request, response) {
  if (request.query.text) {
    let filteredMessages = messages.filter((msg) =>
      msg.text.includes(request.query.text)
    );
    if (filteredMessages.length === 0) {
      response.status(400).json({ msg: "No results" });
    } else {
      response.status(200).json(filteredMessages);
    }
  }
});

//Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", (request, response) => {
  response.send(messages.slice(-10));
});

//New message
app.post("/messages", urlencodedParser, function (request, response) {
  if (!request.body.from || !request.body.text) {
    response
      .status(400)
      .json({ msg: "Please make sure all fields are filled" });
  }

  const newMessage = {
    id: uuid.v4(),
    from: request.body.from,
    text: request.body.text,
    timeSent: newDate().toLocaleDateString(),
  };

  messages.push(newMessage);
  response.status(200).json(messages);
});

//Delete one message by ID
app.delete("/messages/:id", function (request, response) {
  let messageIndex = messages.findIndex((msg) => msg.id === request.params.id);
  if (messageIndex < 0) {
    response.status(400).json({
      msg: "Message with an ID " + request.params.id + " doesn't exist",
    });
  }
  messages.splice(messageIndex, 1);
  response.status(200).json({
    msg: "Message deleted",
    messages: messages,
  });
});

app.listen(PORT);
