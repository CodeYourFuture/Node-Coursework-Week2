const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request, response } = require("express");
let changeID = 0;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const welcomeMessage = {
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", function (request, response) {
  response.send({ messages });
});
app.get("/messages/:id", function (request, response) {
  const messageId = +request.params.id;
  console.log(messageId);
  const oneMessage = messages.find((item) => item.id === messageId);
  response.send({ oneMessage });
  console.log("one message:", oneMessage);
});
app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  const validation =
    text !== undefined &&
    text !== "" &&
    from !== undefined &&
    request.body.hasOwnProperty("text") &&
    request.body.hasOwnProperty("from");
  if (!validation) {
    response.status(400).send("Missing Info");
  } else {
    changeID++;
    let createMessage = {
      id: changeID,
      from: from,
      message: text,
    };
    messages.push(createMessage);
    console.log(messages);
  }
});
app.delete("/messages/:id", (request, response) => {
  const messegeId = +request.params.id;
  messages = messages.filter((item) => item.id !== messegeId);
  console.log(messages);
  response.send({ messages });
});
app.listen(9060);
