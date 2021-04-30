const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

// GET all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// GET message by ID
app.get("/messages/:id", function (request, response) {
  const messageById = messages.find(
    (message) => message.id === parseInt(request.params.id)
  );
  if (messageById) {
    response.status(200);
    response.json(messages);
  } else {
    response.status(404);
    response.send({ messages: "message not found" });
  }
});

// POST new message
app.post("/messages", function (request, response) {
  const newMessage = request.body;

  messages.push(newMessage);
})

// DELETE a message by ID
app.delete("/messages/:id", function (request, response) {
  const messageIndex = messages.findIndex(
    (message) => message.id === parseInt(request.params.id)
  );
  if (messageIndex >= 0) {
    messages.splice(messageIndex, 1);
    response.status(204); // No data
    response.end(); // response body is empty
  }
});

app.listen(PORT);