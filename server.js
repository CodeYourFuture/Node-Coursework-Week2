const express = require("express");
const cors = require('cors')

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "seble",
  text: "Welcome to CYF chat system!"
}


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]
let count = 1

app.get('/',  (req, res) =>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/messages',(req, res) =>{
  res.send(messages);
});

app.get('/messages/:id',(req, res) =>{
  const findMsg = messages.find(msg => msg.id == req.params.id)
  res.send(findMsg)
});

app.post('/messages',(req, res)=>{
  const newMessage = {
    id: count,
    from: req.body.from,
    text: req.body.text
  }
  count+=1
  messages.push(newMessage)
     res.send(messages)
})



app.delete("/messages/:id", function(request, res){
const selectId = request.params.id;
const found = messages.some(message=>message.id == selectId)
if (found){
  messages = messages.filter(message=>message.id != selectId);
  res.status(204).json({ msg : `Message has been deleted`})  
  } else {
    res.status(400).json({ msg : `No message with the id of ${selectId}`})
  }
})

app.put("/messages/:id", function(request, res){
  
const id = parseInt(request.params.id);
const message = messages.find(msg=> id === msg.id);
  if (message){
    let query = request.body
    message.text = query.text
    message.from = query.from
    res.json(message);
  }else{
    res.sendStatus(404)
  }
});


app.listen(process.env.PORT || 5000
);
