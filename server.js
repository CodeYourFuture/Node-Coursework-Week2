const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date().toTimeString().split(" ")[0],
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Create a new message
app.post("/messages", (request, response) => {
  const { id, from, text } = request.body;
  if (!from || !text) {
    response.status(400).send(`Error`);
    return;
  }

  messages.push({
    id,
    from,
    text,
    timeSent: new Date().toTimeString().split(" ")[0],
  });
  response.send(messages);
});

// Read only the most recent 10 messages
app.get("/messages/latest", (request, response) => {
  const latestMessages = messages.slice(-10);
  console.log("LATEST", latestMessages);
  response.send(latestMessages);
});

//Read all messages
app.get("/messages", (request, response) => {
  response.send(messages);
});

//Read _only_ messages whose text contains a given substring
app.get("/messages/search", (request, response) => {
  const query = request.query.text;
  const wordMatched = messages.filter((message) => {
    return message.text.includes(query);
  });
  response.send(wordMatched);
});

//Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  const messageId = Number(request.params.id);
  const messageFound = messages.find((message) => {
    return message.id === messageId;
  });
  response.send(messageFound);
});

//Delete a message, by ID
app.delete("/messages/:id", (request, response) => {
  const messageId = Number(request.params.id);

  messages = messages.filter((message) => {
    message.id !== messageId;
  });
  response.send(messages);
});

app.listen(PORT, () => console.log(`---Server listening on ${PORT}---`));
