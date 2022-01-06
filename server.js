const { response } = require("express");
const express = require("express");
// const cors = require("cors");

const app = express();
app.use(express.json());

// app.use(cors());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

// Create a message
const messages = [];
app.post("/messages", function (request, response) {
  const message = {
    id: 0,
    from: request.body.from,
    text: request.body.text,
  };
  if (!message.from || !message.text) {
    return response
      .status(400)
      .json({ msg: "Please include message & sender !" });
  } else {
    messages.push(message);
    response.status(201);
    message.id = messages.indexOf(message);
    response.json(messages);
  }
});

// Display All messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// Search message by ID
app.get("/messages/:id", function (request, response) {
  let inputId = request.params.id;

  if (inputId > messages.length || inputId < 0) {
    response.status(400).send({ msg: `No message with id:${inputId} found` });
  } else {
    const message = messages.filter((msg) => msg.id == inputId);
    response.json(message);
  }
});

// Delete a message with a specific ID
app.delete("/messages/:id", function (request, response) {
  const inputId = request.params.id;

  if (inputId > messages.length || inputId < 0) {
    response.status(400);
    response.send({ msg: `No message with id:${inputId} found` });
  } else {
    const msgToBeDeleted = messages.findIndex((msg) => msg.id == inputId);
    messages.splice(msgToBeDeleted, 1);
    response.status(200).send(messages);
    response.end();
  }
});

// Search with a word/string
function Searching(word) {
  let filteredMessages = messages.filter((inputText) => {
    return (
      inputText.text.toLowerCase().includes(word.toLowerCase()) ||
      inputText.from.toLowerCase().includes(word.toLowerCase())
    );
  });
  if (word.length > 0) {
    return filteredMessages;
  } else {
    return "No such messages found !";
  }
}

app.get("/message/search", function (request, response) {
  response.send(Searching(request.query.text));
});

// Show 10 latest messages
app.get("/messages/latest", function (request, response) {
  response.send(messages.slice(-10));
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
// const listener = app.listen(5000, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });
