const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

//Middle ware to enable CORS
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to Amanda's chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Create a message
app.post("/create", (request,response) => {
  console.log(request.body)
  if(request.body.message !== "" && request.body.message !== undefined && request.body.sender !== "" && request.body.sender !== undefined ){
    const messageObject = {
      id: messages.length,
      from: request.body.sender,
      text: request.body.message,
      timeSent: new Date()
    }
    messages.push(messageObject); 
    response.send({"message": "message received"});
  } else {
    response.sendStatus(400);
  
  }
})

//View all messages
app.get("/allmessages", (request,response) => {
  response.send({"messages":messages})
})

//View a message with a particular ID
app.get("/message/:id", (request,response) => {
  response.send(messages[request.params.id])
})

//Delete a message with a particular ID
app.delete("/messages/:id", (request,response) => {
  message = messages.map(message => {
    if(message.id !== request.params.id){
      return message;
    }
  })
  response.send(message)
})

//Search for messages that contain a text
app.get("/messages/search", (request,response) => {
  let searchWord = request.query.text;
  let searchResult = messages(message => {
    if(message.text.includes(searchWord)){
      return message
    }
  })
  response.send(searchResult);
})

//View the last 10 messages
app.get("/messages/latest", (request,response) => {
  let firstTenMessages = messages((message,index) => {
    for(let i = messages.length; i > messages.length - 11; i--){
      if(index === i){
        return message
      }
    }
  })
  response.send(firstTenMessages);
})

app.listen(5000, ()=> {
  console.log("App is running");
});
