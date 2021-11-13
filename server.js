const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;
const messages = require("./data");
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/messages", (request, response) => {
  response.send(messages);
});

app.get("/message/search", (request, response) => {
  const queryTerm = request.query.term.toLowerCase();
  const searchedItem = messages.filter((message) => {
    if (message.text.toLowerCase().includes(queryTerm)) return message;
  });
  if (searchedItem.length === 0) {
    return response
      .status(400)
      .send({ msg: `No messages exist with text '${queryTerm}'` });
  } else {
    return response.send(searchedItem);
  }
});

app.get("/message/:id", (request, response) => {
  const searchedId = parseInt(request.params.id);
  const foundMessagesById = messages.some((message) => {
    return message.id === searchedId;
  });

  if (foundMessagesById) {
    const filteredMessage = messages.filter(
      (message) => message.id === searchedId
    );
    response.send(filteredMessage);
  } else {
    return response
      .status(400)
      .send(`Message with the id of ${searchedId} does not exist`);
  }
});
app.delete("message/id", (request, response) => {
  const messageId = +request.params.id;
  const indexOfMessage = messages.findIndex(
    (message) => message.id === messageId
  );
  messages.splice(indexOfMessage, 1);
  response.send(`Message at index ${indexOfMessage} deleted successfully`);
});

app.post("/messages", (request, response) => {
  const from = request.body.from;
  const text = request.body.text;
  if (!from || !text) {
    return response.status(400).send({
      msg: "Please complete all the required areas to add your message!",
    });
  }

  const newMessage = {
    id: uuid.v4(),
    from: from,
    text: text,
    timeOfMessage: new Date().toLocaleString(),
  };
  messages.push(newMessage);
  response.json(messages);
});
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000);
