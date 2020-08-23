const express = require("express");
const cors = require('cors')
var bodyParser = require('body-parser');

const app = express();
const port = 3001;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })); 
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(2020, 11, 17, 3, 24, 0)
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
//reading all messages
app.get('/messages', function(request, response) {
  response.json(messages);
});

//creating new message
app.post('/messages',  (req, res) => {
  let message={
    id:messages.length,
    from:req.body.from ,
    text:req.body.text,
    timeSent:new Date()
  }
  if ((message.from.length>0)&&(message.text.length>0))
  {
messages.push(message);
  res.json(messages);
}
  else
    res.status(400).send(" please enter a value in Name and Message")
});


//Reading one message specified by an 
app.get('/messages/:messageId',  (req, res) => {
  const messageId= req.params.messageId;
  const message = messages.find(p => p.id === parseInt(messageId));
  if(message){
  res.json(message);
  

  }
  else
    res.status(400).send(" wrong request")
});
// deleting a message
app.delete('/messages/:message_id',  (req, res) => {
  const messageId = Number(req.params.message_id);
  let requiredIndex=messages.findIndex(m=>m.id===messageId);
  if(requiredIndex){
  messages.splice(requiredIndex,1)
  res.json(messages);
  }
  else {
    res.status(400).send(" wrong request")
  }

})
// searching

function search(word) {
  console.log((word.toLowerCase()));
  return messages.filter(message => message.text.toLowerCase().includes(word.toLowerCase()));
}

app.get("/messages1/search", function(request, response) {
  const searchWord = request.query.text;
  console.log((searchWord.toLowercase))
  const result = search(searchWord);
  if(result)
  response.send(result);
  else {
    res.status(400).send(" No matching results")
  }
});

// latest10 messages
app.get('/messages2/latest', function(request, response) {
  response.json(messages.slice(0,10));
});

//updating a message
app.put('/messages/:message_id',  (req, res) => {
  const messageId = Number(req.params.message_id);
  let requiredIndex=messages.findIndex(m=>m.id===messageId);
  if(requiredIndex){
    //res.sendFile(__dirname + '/index1.html');
    //messages[requiredIndex].text=req.body.text
  messages[requiredIndex].text="I am changing my message"
  res.json(messages);
  }
  else {
    res.status(400).send(" wrong id")
  }
})
app.listen(port, () => console.log(`[MockServer] listening at http://localhost:${port}`));
