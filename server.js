const express = require("express");
const cors = require("cors");
const { response, request } = require("express");

const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
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

app.get("/messages", (request, response) => {
  response.send(messages);
});
app.get("/messages/search", (request, response) => {
  const searchQuery = request.query.text.toLocaleLowerCase();
  const filterMessages = messages.filter((element) => {
    return element.text.toLowerCase().includes(searchQuery);
  });
  response.send(filterMessages);
});

app.get("/messages/:id", (request, response) => {
  const { id } = request.params;
  // const messageIndex = messages.findIndex((element) => {
  //   return element.id === parseInt(id);
  // });
  // response.json(messages[messageIndex]);
  const message = messages.find((element) => {
    return element.id === parseInt(id);
  });
  response.send(message);
});

app.post("/messages", (request, response) => {
  const message = request.body;
  const date = new Date().toLocaleDateString();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  timeSent = `${hour}:${minutes}, ${date}`;
  message.timeSent = timeSent;
  message.id = messages.length;
  if (message.text && message.from) {
    messages.push(message);
    response.send(messages);
  } else {
    response.sendStatus(400);
    // response.send("Fill all the required fields!");
  }

  response.json(messages);
});

app.delete("/messages/:id", (request, response) => {
  const { id } = request.params;
  messages.map((element) => {
    element.id === parseInt(id) ? messages.splice(id, 1) : null;
  });
  response.send(`You deleted the message with id, ${id}`);
});

app.get("/messages/latest", (request, response) => {
  response.send(messages.slice(-10));
});

app.listen(port);
