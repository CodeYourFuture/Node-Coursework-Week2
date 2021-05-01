const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

app.get("/messages", function(req, res) { 
  res.json(messages)
})

app.get("/messages/:id", function(req, res) { 
  const id = parseInt(req.params.id);
  const filterId = messages.find(item => item.id === id);
  if(filterId){
    res.json(filterId)
  } else {
    res.sendStatus(404);
  }  
})

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  newMessage.id = messages.length;
  messages.push(newMessage);
  res.send("Created");
})

app.delete("/messages/:id", function(req, res){
   messagesData = messages.filter(message => message.id !== req.params.id);
    res.status(204); 
    res.end();
})

app.listen(process.env.PORT || 3000);
