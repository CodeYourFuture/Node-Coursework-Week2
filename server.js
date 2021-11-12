const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = require("./messages.json");

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/search", function (request, response) {
  const text = request.query.text.toLowerCase();

  const filteredMessages = messages.filter((message) => {
    console.log(message.text);
    console.log(text);
    if (message.text.toLowerCase().includes(text)) {
      return message;
    }
  });
  response.send(filteredMessages);
});

app.get("/messages/latest", function (request, response) {
  const tenLatestMessages = messages.slice(-10);
  response.send(tenLatestMessages);
});

app.get("/messages/:messageId", function (request, response) {
  const index = messages.findIndex(
    (message) => message.id == request.params.messageId
  );
  response.json(messages[index]);
});

app.post("/messages", function (request, response) {
  if (request.body.from === "" || request.body.text === "") {
    response.status(400).json({ message: "Request invalid" });
  } else {
    let newId = messages[messages.length - 1].id + 1;
    const newMessage = {
      id: newId,
      from: request.body.from,
      text: request.body.text,
    };
    messages.push(newMessage);

    response.status(200).json({
      message: "message sent",
    });
  }
});

app.delete("/messages/:messageId", function (request, response) {
  const index = messages.findIndex(
    (message) => message.id == request.params.messageId
  );
  messages.splice(index, 1);
  response.send(`Message at index ${index} was deleted`);
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
