const express = require("express");
const cors = require("cors");

const app = express();

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

app.get("/hello", function (request, response) {
  response.send("Hello!");
});

app.use(express.urlencoded({ extended: true })); // for parsing application/json

let idCounter = 1;

// create a new message
app.post("/messages", function (request, response) {
  console.log(request.body);

  const newMessage = {
    id: idCounter++,
    from: request.body.from,
    text: request.body.text,
  };
  messages.push(newMessage);
  console.log(messages);
  response.redirect("/");
});

// read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// read a message by id
app.get("/messages/:id", (req, res) => {
  let newMessage = messages.find((element) => element.id == req.params.id);
  if (newMessage) {
    res.json(newMessage);
  } else {
    res.status(404).send("Not found....");
  }
});

// delete message by id
app.delete("/messages/:id", function (req, res) {
  const messageId = req.params.id;
  const findIndex = messages.findIndex((message) => {
    return message.id === Number(messageId);
  });

  if (findIndex === -1) {
    res.status(404).send("Message not found");
  } else {
    messages.splice(findIndex, 1);
    res.status(204).send();
  }
});

app.listen(process.env.PORT || 4000);
