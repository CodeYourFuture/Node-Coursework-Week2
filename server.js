const express = require("express");
const cors = require("cors");
const { response } = require("express");
const lodash = require("lodash");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", function (request, response) {
  let result = messages.filter(
    (message, index) => index > messages.length - 11
  );
  response.json(result);
});

//Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages/search", function (request, response) {
  const searchText = request.query.text.toLowerCase();
  let result = messages.filter((message) =>
    message.text.toLocaleLowerCase().includes(searchText)
  );
  if (result.length != 0) {
    response.json(result);
  } else {
    response.status(400).json("The text was not found");
  }
});

// Read one message specified by an ID
app.get("/messages/:messageId", function (request, response) {
  const messageId = request.params.messageId;
  if (messageId) {
    const message = messages.filter((message) => message.id == messageId);
    if (message.length != 0) {
      response.json(message);
    } else {
      response.send("The message was not found");
    }
  }
});

//Update one message specified by an ID
app.put("/messages/:id", function (request, response) {
  const messageId = request.params.id;
 const index=messages.findIndex((message) => message.id == messageId);
  if (index > -1) {
   const newText = request.body.text.trim();
   const newFrom = request.body.from.trim();
   messages[index].text = newText ? newText : messages[index].text;
   messages[index].from = newFrom ? newFrom : messages[index].from;
   response.send(messages);
  }
    else
    {
      response.status(501).send("the message was not found");
    }
});

//Delete a message by ID
app.delete("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  console.log(messages.findIndex((message) => message.id == messageId));
  messages.splice(
    messages.findIndex((message) => message.id == messageId),
    1
  );
  response.status(200).json(messages);
  response.end();
});

//Create a new message
app.post("/messages", function (request, response) {
  // const newMessage = {
  //   id: messages.length,
  //   from: request.body.name,
  //   text: request.body.message,
  // };
  const newMessage = {
    id: lodash.uniqueId(),
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date().toLocaleTimeString(),
  };
  console.log("from post", request.body.name);
  //if (!request.body.name || !request.body.message) {
  if (!request.body.from || !request.body.text) {
    response.status(400).json("Please enter your name and message");
  } else {
    messages.push(newMessage);
    response.status(201).json(messages);
  }
});




const PORT = 3000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
