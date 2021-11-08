const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
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
  const messageId = +request.params.messageId;
  const messageIncludedId = messages.filter(
    (message) => message.id === messageId
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
  let lastMessageId = messages[messages.length - 1].id; //DB will create a unique ID, for now, message-id will increase according to the last message-id
  const newMessage = {
    id: lastMessageId + 1,
    from: from,
    text: text,
  };
  messages.push(newMessage);
  response.send(newMessage);
});

app.listen(PORT, () => {
  console.log(`Server is listening the PORT : ${PORT}`);
});
