const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// const date = new Date(); 


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
// messages.timeSent = date;


//homepage
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


//Read all messages
app.get("/messages", function(req, res) { 
  res.json(messages);
})


//  Read only the most recent 10 messages
app.get("/messages/latest", function(req, res) { 
  const recentMessages = messages.slice(-10);
  res.json(recentMessages);
})


//Read only messages whose text contains a given substring:
app.get("/messages/search", function(req, res) { 
  const queryFrom = req.query.from;
  const queryText = req.query.text;

  const filteredText = messages.filter(item => item.from.includes(queryFrom) || item.text.includes(queryText));
 
  if(filteredText){
    res.json(filteredText);
  } else {
    res.sendStatus(404);
  }  
})


//Read one message specified by an ID
app.get("/messages/:id", function(req, res) { 
  const id = parseInt(req.params.id);
  const filterId = messages.find(item => item.id === id);
  if(filterId){
    res.json(filterId)
  } else {
    res.sendStatus(404);
  }  
})


//Create a new message and rejects requests to create messages if empty or missing "text" or "from" property
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  newMessage.id = messages.length;
  
  if(newMessage.from && newMessage.text){
    messages.push(newMessage);
    res.send("Created");
  } else {
     res.sendStatus(400);
  }
})


//Delete a message by ID
app.delete("/messages/:id", function(req, res){
   messages = messages.filter(message => message.id !== req.params.id);
    res.status(204).send("Message Deleted"); 
    res.end();
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));
