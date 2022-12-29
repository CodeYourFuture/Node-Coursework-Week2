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

//One message by ID
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

//New message
app.post("/messages", urlencodedParser, function (request, response) {
  const newMessage = {
    id: uuid.v4(),
    from: request.body.from,
    text: request.body.text,
  };

  messages.push(newMessage);
  response.send(messages);
});

app.listen(PORT);
