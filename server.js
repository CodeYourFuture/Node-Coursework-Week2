const express = require("express");
const cors = require("cors");
const { response } = require("express");

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
const messages = [
  welcomeMessage,
  {
    id: 1,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 2,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 3,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 4,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 5,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 6,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 7,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 8,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 9,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 10,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 11,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 12,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
app.listen(8080);
// 1.Create a new messages
app.post("/messages", (request, response) => {
  const { id, from, text } = request.body;
  const newMessage = { id, from, text };
  if (
    "from" in newMessage &&
    "text" in newMessage &&
    newMessage.from.length > 0 &&
    newMessage.text.length > 0
  ) {
    newMessage.timeSent = new Date();
    messages.push(newMessage);
    response.status(201).send(newMessage);
  } else {
    response
      .status(400)
      .send(
        `CHECK IF:\n\t-->Object contains FROM and TEXT keys \n\t -->TEXT and FROM have a value`
      );
  }
});

// 2.Read all messages
app.get("/messages", (request, response) => {
  response.status(200).send({ messages });
});

// 7.Read-only te most recent 10 messages
app.get("/messages/latest", (request, response) => {
  let newArray = [...messages];
  newArray = newArray.slice(-10);
  response.send(newArray);
});

//6.Read-only messages containing a specific 'substring'
app.get("/messages/search", (request, response) => {
  const requestQuery = request.query.text;
  const newArray = messages.filter((message) =>
    message.text.includes(requestQuery)
  );
  response.send(newArray);
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

//5.UPDATE a message by ID=>PUT Level 5
app.put("/messages/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const updatedMessage = messages.find((message) => message.id === requestId);
  messages.splice(messages.indexOf(updatedMessage), 1, request.body);
  response.send(request.body);
});
