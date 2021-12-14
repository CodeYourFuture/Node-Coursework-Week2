const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

//for use with forms
app.use(express.urlencoded({ extended: false }));


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

//request to read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:msgId", (request, response) => {
  const msgId = request.params.msgId;
  if (msgId) {
    const filteredMsg = messages.filter((message) => message.id == msgId);
    return response.json(filteredMsg);
  }
});
// --------------------------------

app.post("/messages", (request, response) => {
  const lastIndex = messages.length - 1;
  const lastId = messages[lastIndex].id;

  const newMessage = {
    id: lastId + 1,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    return response.sendStatus(400);
  } else {
    messages.push(newMessage);
    return response.send("Message created");
  }
});

app.delete("/messages/:msgId", (request, response) => {
  const msgId = request.params.msgId;

  if (msgId) {
    //finds index of msg obj whose id value equals msgId
    const msgIndex = messages.findIndex((message) => message.id == msgId);

    messages.splice(msgIndex, 1);
    response.json("Message deleted");
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
