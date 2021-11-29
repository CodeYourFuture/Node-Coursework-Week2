const express = require("express");
const cors = require("cors");

const app = express();

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

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.post("/messages", function (request, response) {
  const newmessage = request.body;
  messages.push(newmessage);
  response.sendStatus(201);
});
app.get("/messages/:messageId", function (request, response) {
  const messageId = messages.filter((id) => {});
  response.send(request.messages.messageId);
});

app.listen(3000);
