const express = require("express");
const cors = require("cors");
const welcomeMessage = require("./Messages");
const app = express();
app.use(cors());
app.use(express.json());

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "./index.html");
});

//Creates a New Message
app.post('/messages', function (request, response) {
  const newMessage = {
    id: request.body.id,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMessage.text || !newMessage.from) {
    return response
      .status(400)
      .json({ message: `No text and name on message` });
  }
  messages.push(newMessage);

  //New object ID
  const timeSent = new Date().toLocaleString();
  newMessage.timeSent = timeSent;
  
  response.send(messages);
});


//Reads all Messages
app.get("/messages", (request, response) => response.json(messages));

//Read one message specified by an ID
app.get("/message/:id", (request, response) => {
  const available = messages.filter(message => message.id === parseInt(request.params.id));
  const unAvailable = messages.some(message => message.id === parseInt(request.params.id));
  if(unAvailable){
    response.json(available)
  } else{
    response.status(400).json({message: `No message from the id ${request.params.id}`})
  } 
});

//Delete one message, by ID
app.delete("/message/:id", (request, response) =>{
  const deleteID = messages.filter(
    (item) => item.id === parseInt(request.params.id)
  );
  const chosen = messages.some(
    (item) => item.id === parseInt(request.params.id)
  );
  if(chosen){
    response.json(deleteID)
  } else{
    response
      .status(400)
      .json({ message: `ID ${request.params.id} unavailable to delete `});
  }
})

//Read only messages with the substring - /messages/search?text=express
app.get("/messages/search", (request, response) => {
  const searchText = request.query.text;
   function search(arry) {
     return arry.filter((element) => element.text.includes(searchText));
   }
  response.send(search(messages));
});

//Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", (request, response) => {
  const latest = messages.slice(-10);
  response.json(latest);
});

//Start the server and listen for the HTTP request
const PORT = 2025;
const listener = app.listen(PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
