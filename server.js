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
    from,
    text,
  };
  if (!from || !text) {
    response.status(404).json({ msg: `Please include a ${!newMessage.from ? "name" : !newMessage.message && "message"}.` });
  } else {
    newMessage.id = count++;
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
app.get("/messages/latest", (request, response) => {
  response.send(messages.slice(-10));
})

app.get("/messages/:id", (request, response) => {
  const findMessage = messages.some((message) => message.id === Number(request.params.id));
  if (findMessage) {
    response.json(messages.filter((message) => message.id === Number(request.params.id)));
  } else {
    response.status(404).send(`Sorry, there is no message with id ${request.params.id}`);
  }
});

app.delete("/messages/:id", (request, response) => {
  const messageToDelete = messages.some((message) => message.id === Number(request.params.id));
  if (messageToDelete) {
    messageIndex = messages.findIndex((message) => message.id === Number(request.params.id));
    messages.splice(messageIndex, 1);
    response.json({ msg: "Message deleted successfully", messages});
  } else {
    response.status(404).send(`Sorry, there is no message with id ${request.params.id}`);
  }
});
const PORT = process.env.PORT || 7500;
app.listen(PORT, console.log(`listening on port ${PORT}`));
