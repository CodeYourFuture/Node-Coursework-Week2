const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { restart } = require("nodemon");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/message/messageId", function (request, response) {
  const { messageId } = request.params.messageId;
  const findMessage = messages.find(
    (message) => message.id === Number(messageId)
  );
  return findMessage
    ? response.json(findMessage)
    : response.status(404).json("sorry,did not find anything");
});

app.get("/message", function (request, response) {
  response.json(messages);
});

app.post("/message", function (request, response) {
  const { from, text } = request.body;

  if (from === undefined || text === undefined) {
    const responseMiss = {
      message: ` you are missing ${!from ? "from" : "text"}`,
    };
    return response.status(400).json(responseMiss);
  }

  const ourMessageObject = {
    id: messages.length,
    from,
    text,
  };
  messages.push(ourMessageObject);
  response.json("You've POST /messages");
});

app.delete("/message/:messageId", function (request, response) {
  const { messageId } = request.params;
  const messageIndex = messages.findIndex(
    (message) => message.id !== Number(messageId)
  );

  if (messageIndex > -1) {
    response.json(messages[messageIndex]);
    messages.splice(messageIndex, 1);
  } else {
    response
      .status(404)
      .status(`sorry could not find that item with id ${messageId}`);
  }
  // response.send(`we deleted your request message with ${messageId}`);
});

app.listen(3009, () => "app now listening on port 3009");

// process.env.PORT;
