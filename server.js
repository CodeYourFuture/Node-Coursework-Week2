const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

app.use(cors());

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

//send all messages
app.get("/messages", (request, response) => {
  response.send(messages);
});

//Read one message specified by an ID
app.get("/messages/:messageId", (request, response) => {
  //LOOK at the messageId, it could be 3 different version, /id , /search?text=xyz , /lastest
  const messageId = request.params.messageId;
  //route is => /messages/search?text=express
  // take search text from query
  //filter all messages that include search text
  //send filtered message
  // DON'T FORGET the RETURN!!!
  if (messageId === "search") {
    const serachTerm = request.query.text.toLowerCase();
    const messagesIncludesSearchTerm = messages.filter(
      (message) =>
        message.text.toLowerCase().includes(serachTerm)
    );
    if (messagesIncludesSearchTerm.length === 0) {
      response.status(404).send({
        msg: `Message not found with text: ${serachTerm}`,
      });
      return;
    }
    response.send(messagesIncludesSearchTerm);
    return;
  }

  ////route is => /messages/lastest
  //send last 10 message and RETURN
  if (messageId === "lastest") {
    response.send(messages.slice(-10));
    return;
  }
  //route is => /messages/12
  const messageIncludedId = messages.filter(
    (message) => message.id === +messageId
  );
  messageIncludedId.length === 0
    ? response.status(404).send({
        msg: `Message not found with id: ${messageId}`,
      })
    : response.send(messageIncludedId);
});

// Create a new message
app.post("/messages", (request, response) => {
  const from = request.body.from;
  const text = request.body.text;
  if (!from) {
    return response.status(400).send({
      msg: 'Please check your message\'s "from" properties',
    });
  }
  if (!text) {
    return response.status(400).send({
      msg: 'Please check your message\'s "text" properties',
    });
  }

  let lastMessageId = messages[messages.length - 1].id; //DB will create a unique ID, for now, message-id will increase according to the last message-id
  const newMessage = {
    id: lastMessageId + 1,
    from: from,
    text: text,
  };
  messages.push(newMessage);
  response.send(newMessage);
});

// Delete a message, by ID
app.delete("/messages/:messageId", (request, response) => {
  const messageId = +request.params.messageId;
  const messageIindex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIindex === -1) {
    return response.status(404).send({
      msg: `Message not found with id: ${messageId}`,
    });
  } else {
    messages.splice(messageIindex, 1);
    response.send({
      msg: `Message id: ${messageId} deleted successfully `,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening the PORT : ${PORT}`);
});
