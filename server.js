const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(cors());

let welcomeMessage = {
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

app.post('/messages', (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text
  }
   if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ msg: "Please type Name and Message" });
  }
  
  messages.push(newMessage);
  res.status(200).json(messages);
  
});

app.get('/messages', function(request, response) {
  response.json(messages);
});

app.delete('/messages/:id', (req,res) => {
  const messageId = parseInt(req.params.id);
  
  messages = messages.filter(message => message.id !== messageId);
  res.status(200).send();
})

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find(message => message.id === messageId);
  if(message) {
    res.status(200).send(message);
  } else {
    res.status(404).send({message: "User not found"});
  }
})



//app.listen(process.env.PORT || 5000);
server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));