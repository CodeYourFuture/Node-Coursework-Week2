const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

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

app.listen(9090);

// 1.Create a new messages
app.post("/messages", (request, response) => {
  const newMessage = request.body;
  messages.push(newMessage);
  response.status(201).send(newMessage);
});

// 2.Read all messages
app.get("/messages", (request, response) => {
  response.status(200).send({ messages });
});

//3.Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const messageId = messages.find((message) => message.id === requestId);
  response.status(200).send(messageId);
});

//4.Delete a message, by ID
app.delete("/messages/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const deletedMessage = messages.find((message) => message.id === requestId);
  messages.splice(messages.indexOf(deletedMessage), 1);
  response.send(deletedMessage);
});

//5.UPDATE a message by ID=>PUT
app.put("/messages/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const updatedMessage = messages.find((message) => message.id === requestId);
  messages.splice(messages.indexOf(updatedMessage), 1, request.body);
  response.send(request.body);
});
