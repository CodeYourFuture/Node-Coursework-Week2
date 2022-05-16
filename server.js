const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];
let count = messages.length;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (request, response) => {
  const from = request.body.from;
  const text = request.body.text;
  const newMessage = {
    id: count++,
    from,
    text,
  };
  if (!from || !text) {
    response.status(404).json({ msg: `Please include a ${!newMessage.from ? "name" : !newMessage.message && "message"}.` });
  } else {
    messages.push(newMessage);
    response.json("Message sent");
  }
});

app.get("/messages", (request, response) => {
  response.send(messages);
});

app.get("/messages/search?", (request, response) => {
  const searchResults = messages.filter((result) => {
    return result.text.toLowerCase().includes(request.query.text.toLowerCase());
  });
  if (searchResults) {
    response.json(searchResults);
  }
});

app.get("/messages/:id", (request, response) => {
  const findMessage = messages.some((message) => message.id === Number(request.query.messageId));
  if (findMessage) {
    response.json(messages.filter((message) => message.id === Number(request.query.messageId)));
  } else {
    response.status(404).send(`Sorry, there is no message with id ${request.query.messageId}`);
  }
});

app.delete("/messages/:id", (request, response) => {
  const messageToDelete = messages.some((message) => message.id === Number(request.query.deleteId));
  if (messageToDelete) {
    response.json({ msg: "Member deleted successfully", messages: messages.filter((message) => message.id !== Number(request.query.deleteId)) });
  } else {
    response.status(404).send(`Sorry, there is no message with id ${request.query.deleteId}`);
  }
});

app.listen(process.env.PORT);
