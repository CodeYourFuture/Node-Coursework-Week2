const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // before our routes definition

// helper functions
const generator = require("./util/generator");
const validateMessage = require("./util/helper");

const welcomeMessage = {
  id: 000,
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

app.listen(process.env.PORT || 4000);

// Read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// create a new message
app.post("/messages", (req, res) => {
  // console.log(req.body);
  let newFrom = req.body.from;
  let newText = req.body.text;
  if (validateMessage(req.body)) {
    res.status(400).send("message is not valid");
  } else {
    let seqID = generator.generate();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let newMessage = {
      id: Number(seqID),
      from: newFrom,
      text: newText,
      timestamp: today.toUTCString(),
    };
    messages.push(newMessage);
    res.send(messages);
  }
});

// Read one message by id

app.get("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  const message = messages.find((message) => message.id === id);
  res.send(message);
});

// Delete one message by id

app.delete("/messages/:id", (req, res) => {
  console.log("DELETE message");
  let id = req.params.id;
  messages.splice(id, 1);
  res.send(messages);
});
