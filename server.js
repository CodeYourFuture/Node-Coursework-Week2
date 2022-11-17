const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
let nextId = 1;
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
  const newMessage = request.body;
  newMessage.id = nextId++;

  if (
    newMessage.text == null ||
    newMessage.text == "" ||
    newMessage.from == null ||
    newMessage.from == ""
  ) {
    response.status(400).send("Text and From must not be empty!");
    return;
  }
  messages.push(newMessage);
  console.log(newMessage);
  response.send("new message");
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/latest", function (request, response) {
  if (messages.length >= 10) {
    return response.send(messages.slice(messages.length - 10));
  } else {
    return response.send(messages);
  }
});

app.get("/messages/search", function (request, response) {
  let messageRead = messages.filter((message) =>
    message.text.includes(request.query.text)
  );
  response.send(messageRead);
});
app.get("/messages/:id", function (request, response) {
  let messageRead = messages.filter(
    (message) => message.id == request.params.id
  );
  response.send(messageRead[0]);
});

app.delete("/messages/:id", function (request, response) {
  messages = messages.filter((message) => message.id != request.params.id);
  response.send();
});

app.listen(3002, () => {
  console.log(`Server listening on ${3002}`);
});
