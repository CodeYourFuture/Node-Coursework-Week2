const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// create application/x-www-form-urlencoded parser - middlleware function
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(express.json());

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
app.get("/messages", function (request, response) {
  response.status(200).json(messages);
});

// Get all messages by search term
app.get("/messages/search", function (request, response) {
  if (request.query.text) {
    let filteredMessages = messages.filter((msg) =>
      msg.text.includes(request.query.text)
    );
    if (filteredMessages.length == 0) {
      response.status(400).json({ msg: "No matching results" });
    } else {
      response.status(200).json(filteredMessages);
    }
  }
});
// Get 10 latest messages
app.get("/messages/latest", function (request, response) {
  let latestMessages = messages.slice(-10).reverse();
  response.status(200).json(latestMessages);
});

// Get one message by id
app.get("/messages/:id", function (request, response) {
  let message = messages.find((msg) => msg.id == request.params.id);
  if (message) {
    response.status(200).json(message);
  } else {
    response.status(400).json({
      msg: "No message with the Id '" + request.params.id + "' is found",
    });
  }
});

// Create new message
app.post("/messages", urlencodedParser, function (request, response) {
  if (!request.body.from || !request.body.text) {
    response.status(400).json({ msg: "Please enter all fields" });
  }

  const newMessage = {
    id: uuid.v4(),
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date(),
  };

  messages.push(newMessage);
  response.status(200).json(messages);
});

// Update one message by id
app.put("/messages/:id", function (request, response) {
  let msgIndex = messages.findIndex((msg) => msg.id == request.params.id);
  if (msgIndex < 0) {
    response.status(400).json({
      msg: "No message with the Id '" + request.params.id + "' is found",
    });
  }
  if (request.body.text) {
    messages[msgIndex].text = request.body.text;
  }
  if (request.body.from) {
    messages[msgIndex].from = request.body.from;
  }

  response.status(200).json(messages);
});

// Delete one message by id
app.delete("/messages/:id", function (request, response) {
  let msgIndex = messages.findIndex((msg) => msg.id == request.params.id);
  if (msgIndex < 0) {
    response.status(400).json({
      msg: "No message with the Id '" + request.params.id + "' is found",
    });
  }
  messages.splice(msgIndex, 1);
  response.status(200).json({
    msg: "Message successfully deleted",
    messages: messages,
  });
});
app.listen(PORT);
