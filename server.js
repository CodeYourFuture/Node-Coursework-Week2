const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json()); // we have to do it when we just send json

// function to check and create id's
function newID() {
  // Get list of IDs
  let ids = welcomeMessage.map((el) => el.id).sort();
  let nextId = 1;
  // check if id string is taken
  while (ids.includes(`${nextId}`)) {
    nextId++;
  }
  return nextId;
}

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Isa",
    text: "Estos son mis mensajes!",
  },
];
console.log(welcomeMessage);
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = welcomeMessage;
// This code is necessary to when a post method comes from a form
app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
  let oneMessages = {
    id: uuidv4(),
    from: request.body.from,
    text: request.body.text,
  };
  messages.push(oneMessages);
  response.status(201).send("New message stored");
});

app.get("/messages/:id", function (request, response) {
  response.send(messages[request.params.id]);
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
