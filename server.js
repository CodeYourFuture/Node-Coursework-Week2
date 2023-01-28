const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
const port = process.env.PORT || 4500;

// creating increment unique id for each message
let generateNewID = 0;

app.use(cors());
app.use(express.json());


const welcomeMessage = [];

// Time formating
const today = new Date();
const format = Intl.DateTimeFormat("en-us", {
  dateStyle: "full",
  timeStyle: "medium",
  //dayPeriod: "long"
});

console.log(format);
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = welcomeMessage;

// app.get("", function (request, response) {
//   console.log(GenerateUniqueId)
//   response.send({ welcomeMessage });
// });

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/allMessages", (req, res) => {
  const message = req.body;
  generateNewID++;

  const newMessages = {
    id: generateNewID,
    from: message.from,
    text: message.text,
    time: new Date().toUTCString(),
    //
  };

  const valid = !!message.text && !!message.from;
  if (!valid) {
    res.status(400).send("💥Something is not working 💥");
  } else {
    messages.push(newMessages);
    res.status(200).send(messages);
  }
});

app.get("/messages", function (request, response) {
  messages.length === 0
    ? response.send("There is no messages yet 💬")
    : response.send(messages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = +request.params.id;
  const oneMessage = messages.find((el) => el.id === messageId);
  response.send({ oneMessage });
});

app.delete("/messages/:id", function (request, response) {
  const messageId = +request.params.id;
  const oneMessage = messages.filter((el) => el.id !== messageId);
  response.send({ oneMessage });
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
