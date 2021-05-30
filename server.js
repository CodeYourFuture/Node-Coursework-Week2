const express = require("express");
const cors = require("cors");
const lodash = require("lodash");
// My messages were not being added, so I was recommended to add body-parser
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

// This array is our "data store".
// We will start with one message in the array.
// Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (_, response) {
  response.sendFile(__dirname + "/index.html");
});

// create new message
app.post("/messages", function (request, response) {
  if (!request.body.from || !request.body.text) {
    response.status(422).json(messages);
    return;
  }
  let date = new Date();
  const newMessage = {
    id: parseInt(lodash.uniqueId()),
    from: request.body.from,
    text: request.body.text,
    timeSent: date,
  };
  messages.push(newMessage);
  response.status(200).json(messages);
});

// read all messages
app.get("/messages", function (_, response) {
  response.send(messages);
});

// read message by ID
app.get("/message/:messageId", function (request, response) {
  console.log(request.params.messageId);
  response
    .status(200)
    .send(
      messages.find(
        (message) => message.id === parseInt(request.params.messageId)
      )
    );
});

// delete message by ID
app.delete("/message/:messageId", function (request, response) {
  let message_to_delete;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id == request.params.messageId) {
      message_to_delete = messages[i];
      messages.splice(i, 1);
      break;
    }
  }
  response.send(message_to_delete);
});

// search message by word
function search(word) {
  return messages.filter((message) =>
    message.text.toLowerCase().includes(word)
  );
}

// I had help understanding it was going in to another route (not the search)
app.get("/messages/search", function (request, response) {
  const searchWord = request.query.text.toLowerCase();
  const result = search(searchWord);
  response.send(result);
});

// latest 10 messages
app.get("/messages/latest", function (_, response) {
  console.log("hello daniel");
  response.send(messages.slice(-10));
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
