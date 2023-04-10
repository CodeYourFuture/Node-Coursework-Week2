const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

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
const messages = [];
let nextMessageID = 0;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/message", (req, res) => {
  if (req.body.from !== "" && req.body.text !== "") {
    nextMessageID++;
    const message = {};
    message.id = nextMessageID;
    message.from = req.body.from;
    message.text = req.body.text;
    // message.timeSent = Date.now();
    // message.timeSent = new Date().toDateString();
    // message.timeSent = new Date().toISOString();
    message.timeSent = new Date().toString();
    // message.timeSent = new Date().toLocaleDateString();
    messages.push(message);
    res.send(messages);
  } else {
    res.sendStatus(400);
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/message/:id", (req, res) => {
  const userId = req.params.id;
  const messageById = messages.filter((message) => message.id == userId);
  res.json(messageById);
});

app.delete("/message/:id", (req, res) => {
  const userId = req.params.id;

  const messageById = messages.filter(
    (message) => message.id !== Number(userId)
  );
  res.json(messageById);
});

app.get("/messages/search", (req, res) => {
  console.log(req.query);
  const text = req.query.text;
  const messageText = messages.filter((message) => message.text.includes(text));
  res.json(messageText);
});

app.get("/messages/latest", (req, res) => {
  if (messages.length >= 10) {
    const latestMessages = messages.slice(-10);
    res.json(latestMessages);
  } else {
    res.json(messages);
  }
});

app.put("/messages/update/:id", (req, res) => {
  console.log(req.body);
  const userId = req.params.id;
  const findIndex = messages.filter((message) => message.id === Number(userId));
  findIndex[0].from = req.body.from;
  findIndex[0].text = req.body.text;
  // const findIndex = messages.findIndex((message) => message.id === Number(userId));
  // messages[findIndex].from = req.body.from;
  // messages[findIndex].text = req.body.text;
  // res.json(messages[findIndex]);
  res.json(findIndex);
});

// if user wants to get random latest messages

// app.get("/messages/latest/:number", (req, res) => {
//   if (messages.length >= req.params.number) {
//     const latestMessages = messages.slice(-Number(req.params.number));
//     res.json(latestMessages);
//   } else {
//     res.json(messages);
//   }
// });

//app.listen(process.env.PORT)
app.listen(port, () => {
  console.log("server is listening to the port 3000...");
});
