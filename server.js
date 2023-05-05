const express = require("express");
const cors = require("cors");
const {request,response, urlencoded} = require ('express');
const app = express();
const PORT= process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
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


// Create a new message
app.post('/messages', function(req,res) {
const newMessage = {
  id:messages.length,
  from:req.body.from,
  text: req.body.text,
  timeSent:new Date().toLocaleString(),
};
if(!newMessage.from || !newMessage.text) {
  return response
  .status(400)
  .json({message: "Name and Message needed to proceed"});
}
messages.push(newMessage);
res.send(messages);
})


// - [ ] Read all messages
app.get('/messages', function(req,res) {
  res.send(messages);
})

// - [ ] Messages based on search term 
app.get('/messages/search', function(req,res) {
  const searchMessage = req.query.term;

  function searchTerm (array) {
    return array.filter((word)=>
    word.text.toLowerCase().includes(searchMessage.toLowerCase()));
  }
  res.send(searchTerm(messages));
});

//-[ ] 10 recent messages
app.get('/messages/last', function (req,res){
  const lastMessages = messages.slice(-10);
  res.send(lastMessages);
});
// - [ ] Read one message specified by an ID
app.get('/messages/:id', function(req,res){
  const messageWithId= messages.find((x)=> x.id === Number(req.params.id));

  messageWithId ?
  res.json(messageWithId):
  res.status(400).json({message: 'No Message Found with that Id'});
});


// - [ ] Delete a message, by ID
app.delete('/messages/:id', function (req,res){
  const selectMessage= messages.find((x) => x.id === Number(req.params.id));

  if(selectMessage){
    res.json({
      message: `Message with ${req.params.id} is no more`,
      messages:messages.filter((x)=> x.id !== Number(req.params.id)),
    }); 
  } else {
    res.status(400).json({message: `Message ${req.params.id} could not be located`});
  }
});

//- [ ] Update Messages
app.put('/messages/:id', function (req, res) {
  const selectMessage = messages.find((x) => x.id ===Number(req.params.id));
  if (selectMessage) {
    const updateMessage = req.body;

    messages.forEach((x) => {
      if (x.id ===Number(req.params.id)) {
        x.from = updateMessage.from ? updateMessage.from : x.from;
          x.text = updateMessage.text ? updateMessage.text : x.text;

          res.json({msg:'Message has been updated', x});
      } else {
        res.status(400).json({message:'No Message Found'})
      }
    });
  }
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
