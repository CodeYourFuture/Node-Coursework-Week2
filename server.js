const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const messages = [{
  id: 0,
  from: "Bart",
  text: "Welcome by Brat !",
},
{
  id: 1,
  from: "Sana",
  text: "Sana's Message!",
},
]
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
// Get all messages
app.get("/messages",function(req,res){
  res.status(200).json(messages);
})

// read one message specified by id
app.get("/messages/:messageId", (req, res) => {
  const messageId = parseInt(req.params.messageId);
  const foundMessage = messages.find((messageItem) => {
    return messageItem.id === messageId;
  });
  res.json(foundMessage);
});

// create a new message,post and validate
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
    .json({message: "Try again !! Name and Message are required"});
  }
  messages.push(newMessage);
  res.send(messages);
  })

// Delete a message, by ID
app.delete('/messages/:id', function (req,res){
  const selectMessage= messages.find((x) => x.id === Number(req.params.id));
  if(selectMessage){
    res.json({
      message: `Message associated with id${req.params.id} has been deleted `,
      messages:messages.filter((x)=> x.id !== Number(req.params.id)),
    }); 
  } else {
    res.status(400).json({message: `Message associated with id${req.params.id} was not found`});
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



app.listen(3001, () => {console.log("Your server is listening at 3001");
});
