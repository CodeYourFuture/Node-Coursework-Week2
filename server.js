const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
let changeID = 0;
const app = express();
app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
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

app.get("/messages", function (request, response) {
  if (messages.length === 0) {
    response.send("There is no data to view.");
  } else {
    response.send(messages);
  }
});

app.get("/messages/search", (request, response) => {
  const term = request.query.term;
  let filteredMessages = messages.filter((eachMessage) =>
    eachMessage.text.includes(term)
  );
  if (filteredMessages.length === 0) {
    response.send("Nothing found including this word!");
  } else {
    response.send(filteredMessages);
  }
});

app.get("/messages/latest", (request, response) => {
  console.log("hello");

  response.send(messages.slice(-10));
});

app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  const validation =
    text !== undefined &&
    text !== "" &&
    from !== undefined &&
    from !== "" &&
    request.body.hasOwnProperty("text") &&
    request.body.hasOwnProperty("from");
  if (!validation) {
    response.status(400).send("Missing Info");
  } else {
    changeID++;
    let createMessage = {
      id: changeID,
      from: from,
      text: text,
    };
    messages.push(createMessage);
    response
      .status(200)
      .send(
        `Your message has been successfully added ${JSON.stringify(messages)}`
      );
  }
});

app.delete("/messages/:id", (request, response) => {
  const messageID = +request.params.id;
  messages = messages.filter((item) => item.id !== messageID);
  if (messages.length === 0) {
    response.send("There is no data to view.");
  } else {
    response.send(messages);
  }
});

app.listen(9090);
