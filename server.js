const express = require("express");
const cors = require("cors");
// const { response, request } = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());
app.use(express.json()); // this will allow us to handle raw json
app.use(express.urlencoded({ extended: false }));

const messages = [
  {
    id: 1,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 2,
    from: "John",
    text: "Hi there!",
  },
  {
    id: 3,
    from: "Peter",
    text: "Welcome to coding School!",
  },
  {
    id: 4,
    from: "Mary",
    text: "Work hard!",
  },
  {
    id: 5,
    from: "Dave",
    text: "Welcome to CYF!",
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Get all messages
app.get("/messages", (request, response) => {
  response.json(messages);
});

// Create a new message
app.post("/messages/", (request, response) => {
  const newMessage = {
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date(),
  };
  if (!newMessage.from || !newMessage.text) {
    return response
      .status(400)
      .json({ msg: "Please fil all the form fields." });
  }
  messages.push(newMessage);
  response.json(messages);
});

//Get one message by an Id

app.get("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  const idSearched = messages.filter((message) => message.id === id);
  const found = messages.some((message) => message.id === id);

  if (found) {
    response.json(idSearched);
  } else {
    response.status(404).send(`No messages match the id ${id}.`);
  }
});

//Delete message by Id

app.delete("/messages/:id", (request, response) => {
  const id = Number(request.params.id);

  const found = messages.some((message) => message.id === id);

  if (found) {
    response.json({
      msg: "Message deleted",
      messages: messages.filter((message) => message.id !== id),
    });
  } else {
    response.status(404).send(`No messages match the id ${id}.`);
  }
});

//Update message by Id

app.put("/messages/:id", (request, response) => {
  const id = Number(request.params.id);

  const found = messages.some((message) => message.id === id);

  if (found) {
    const updMessage = request.body;
    messages.forEach((message) => {
      if (message.id === id) {
        message.from = updMessage.from ? updMessage.from : message.from;
        message.text = updMessage.text ? updMessage.text : message.text;

        response.json({ msg: "Message updated", message });
      }
    });
  } else {
    response.status(404).send({ msg: `No message matches the id ${id}.` });
  }
});

// Get messages with a give substing /messages/search?text=express

// NOTE: the else statement is never hit, it returns a empty array instead.
// I tried different solutions without sucess.

app.get("/messages/search", function (request, response) {
  let searchTerm = request.query.text;

  const searchResult = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchResult) {
    response.json(searchResult);
  } else {
    return response
      .status(404)
      .send("No message match your search. Please add another term!");
  }
});

// Get the most recent 10 messages: /messages/latest

app.get("/messages/latest", (request, response) => {
  response.json(messages.slice(0, 10));
});

app.listen(process.env.PORT || 5000);
