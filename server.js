const express = require("express");
const cors = require("cors");

const app = express();

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
const messages = [welcomeMessage];
let messageCounter = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


//route for returning all the messages
app.get("/messages", function (request, response) {
  response.send(messages)
});

// return a message by id
app.get("/messages/:id", function (request, response) {
  const matchingMessage = messages.find((message) => {
    if (request.params.id == message.id) {
      return true;
      } return false;
    })
  response.send(matchingMessage)
  });
// validating that the request has both text and from properties
function validateNewMessage(newMessage) {
  if (newMessage.from === undefined || newMessage.text === undefined) {
    return false;
  } else if (newMessage.from.trim()=== "" || newMessage.text.trim() === "") {
    return false;
  } 
  return true;
};

//route for posting a new message
app.post("/messages", function (request, response) {
  let newMessage = request.body;
  console.log(newMessage);
  
  if (!validateNewMessage(newMessage)) {
    response.sendStatus(400);
  } else {
    newMessage.id = messageCounter++;
    messages.push(newMessage);
    //console.log(JSON.stringify(messages));
    response.sendStatus(201);
  }
});

const listener = app.listen(4002, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
