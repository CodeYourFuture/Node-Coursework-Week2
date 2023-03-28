const express = require("express");
const cors = require("cors");
const { request, response } = require("express");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/messages", function (request, response) {
  const newWelcomeMessage = {
    id: Math.floor(Math.random() * messages.length) + messages.length,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newWelcomeMessage.from || !newWelcomeMessage.text) {
    return response
      .status(400)
      .json({ message: "Please include name and message" });
  }

  messages.push(newWelcomeMessage);
  response.send(messages);
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/:id", function (request, response) {
  const foundMessage = messages.find(
    (eachMessage) => eachMessage.id === parseInt(request.params.id)
  );

  foundMessage
    ? response.json(foundMessage)
    : response.status(400).json({ message: "Message not found" });
});

app.delete("/messages/:id", function (request, response) {
  const foundMessage = messages.find(
    (eachMessage) => eachMessage.id === parseInt(request.params.id)
  );

  if (foundMessage) {
    response.json({
      message: `Message ${request.params.id} deleted`,
      messages: messages.filter(
        (eachMessage) => eachMessage.id !== parseInt(request.params.id)
      ),
    });
  } else {
    response
      .status(400)
      .json({ message: `Message ${request.params.id} not found` });
  }
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
