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

  const messageById = messages.filter((message) => message.id !== Number(userId));
  res.json(messageById);
});

// {
//   path: /messages/1,
//   method: DELETE
// }

//app.listen(process.env.PORT)
app.listen(port, () => {
  console.log("server is listening to the port 3000...");
});
