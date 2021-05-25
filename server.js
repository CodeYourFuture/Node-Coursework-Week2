const express = require("express");
const cors = require("cors");
const lodash = require("lodash");

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

//Read all messages
app.get('/messages', function(request, response) {
  response.send(messages);
});
//Create a new message, reject requests to create messages if the message objects have an empty or missing text or from property
app.post("/messages", function (request, response) {
  const newMessage = request.body;
  newMessage.id = messages.length;  
  if(!request.body.from || !request.body.text){
    response.status(400);
    response.send("You are missing some required fields!!!");
  }  else {
    messages.push(newMessage);    
    response.status(201);
    response.send(messages); 
  }      
});

//Read only messages whose text contains a given substring
app.get("/messages/search", function (request, response) {
  const searchText = request.query.text;
  console.log(request.query.text);
  const result = messages.filter(message => message.text.toUpperCase().includes(searchText.toUpperCase()));
  console.log(result)
  response.send(result);
});

//Read only the most recent 10 messages
app.get("/messages/latest", function (request, response) {
  const lastTenMessages = lodash.takeRight(messages, 10)
  response.send(lastTenMessages);
});

// Read one message specified by an ID
app.get("/messages/:messageId", function (request, response) {
  let requestedMessage = messages.find(message => message.id == request.params.messageId);
  response.status(200);
  response.send(requestedMessage);   
})

//Delete a message, by ID
app.delete("/messages/:messageId", function (request, response) {
  let deletedMessage;
  for (let i = 0; i < messages.length; i++) {
    if(messages[i].id == request.params.messageId){
      deletedMessage = messages[i],
      messages.splice(i, 1)
    }  
   } if(deletedMessage === undefined) {
     response.status(404);
     response.send(`The message with ID: ${request.params.messageId} is not exist`);
   } response.status(200);
    
    console.log(messages);
    response.send(`The message with ID: ${request.params.messageId} has been deleted`);
})






const PORT = 5000;

const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// app.listen(process.env.PORT);
