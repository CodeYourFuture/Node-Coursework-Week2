const express = require("express");
const cors = require("cors");

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

app.get('/messages', function(request, response) {
  response.send(messages);
});

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

app.get("/messages/:messageId", function (request, response) {
  let requestedMessage = messages.find(message => message.id == request.params.messageId);
  response.status(200);
  response.send(requestedMessage);   
})

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
