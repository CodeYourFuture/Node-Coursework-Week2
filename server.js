const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// to be able to read json in our file
app.use(express.json());

// remove the encoding that browser adds. look into details later
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [
  welcomeMessage,
  {
    id: 1,
    from: "French Person",
    text: "Bienvenue sur le système de chat CYF!",
  },
  {
    id: 2,
    from: "Spanish Person",
    text: "¡Bienvenido al sistema de chat CYF!",
  },
  {
    id: 3,
    from: "Italian Person",
    text: "Benvenuto nel sistema di chat di CYF!",
  },
  {
    id: 4,
    from: "Portuguese Person",
    text: "Bem-vindo ao sistema de bate-papo da CYF!",
  },
  {
    id: 5,
    from: "Romanian Person",
    text: "Bine ați venit la sistemul de chat CYF!",
  },
  {
    id: 6,
    from: "Irish Person",
    text: "Fáilte go córas comhrá CYF!",
  },
  {
    id: 7,
    from: "Turkish Person",
    text: "CYF sohbet sistemine hoş geldiniz!",
  },
];

// returns the current date and time combined in a single string.
const getCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  return dateTime;
};

// adds the time stamp to the existing chat messages.
const addTimeStamp = () => {
  const currentDateTime = getCurrentDateTime();
  messages.forEach((message) => {
    message.timeSent = currentDateTime;
  });
};

addTimeStamp();

// root
app.get("/", function (request, response) {
  console.log(`Running server on Port ${PORT}`);
  response.sendFile(__dirname + "/index.html");
});

// display all the messages
app.get("/messages", function (request, response) {
  response.status(200);
  response.json(messages);
});

// Display message matching an id
app.get("/messages/:id(\\d+)?", function (request, response) {
  const inputId = request.params.id;
  if (inputId < messages.length) {
    response.json(messages[inputId]);
  } else {
    response.sendStatus(404);
  }
});

// display the messages whose text contains a given substring
app.get("/messages/search", function (request, response) {
  const searchText = request.query.text;
  const filteredMessages = messages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchText.toLowerCase()) ||
      message.text.toLowerCase().includes(searchText.toLowerCase())
  );
  response.json(filteredMessages);
});

// display latest 10 messages
app.get("/messages/latest", function (request, response) {
  const numOfMessages = 10;
  let startIndex = 0;

  if (messages.length > numOfMessages) {
    startIndex = messages.length - numOfMessages;
  }
  response.json(messages.slice(startIndex));
});

// create a new message
app.post("/messages", function (request, response) {
  const message = { id: messages[messages.length - 1].id + 1, ...request.body };

  const dateTime = getCurrentDateTime();

  message.timeSent = dateTime;

  if (message.from !== "" && message.text !== "") {
    messages.push(message);
    response.sendStatus(201);
  } else {
    response.sendStatus(400);
  }
});

// delete the message with the given id
app.delete("/messages/:id(\\d+)?", function (request, response) {
  const id = parseInt(request.params.id);
  messages = messages.filter((message) => message.id !== id);
  response.json(messages);
});

app.listen(PORT);
