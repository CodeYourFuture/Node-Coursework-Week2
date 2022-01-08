const express = require("express");
const cors = require('cors')

const app = express();

// required to when retrieving data from a form submit
app.use(express.json());//allows me to use raw
app.use(express.urlencoded({ extended: true, }));

app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, {id:1, from: "Fareedh", text: "here we go"},{id:2, from: "yawe", text: "hustles"}, {id:3, from: "mawejje", text: "it shall be done"}]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', (req, res)=>{
  res.status(200).send(messages);
})

app.get('/messages/latest', (req, res)=>{
  res.status(200).send(messages.slice(-10));
})

app.get('/messages/search', (req, res)=>{
  let searchResult = messages.filter((item)=>{
    return item.text.toLowerCase().includes(req.query.text.toLowerCase());
  })
  res.status(200).send(searchResult);
})

app.get('/messages/:id', (req, res)=>{
  res.status(200).send(messages.find((item)=>{
    return item.id == req.params.id;
  }));
})

app.delete('/messages/:id', (req, res)=>{
  let deletedMessage = messages.find((item)=>{return item.id == req.params.id})
  messages.splice(messages.indexOf(deletedMessage),1);
  res.status(200).send(`Message: ${req.params.id} has been deleted`);
})

app.put('/messages/:id', (req, res)=>{
  const editMessage = messages.find((item)=>{return item.id == req.params.id})
  const updatedMessage = Object.assign(editMessage,req.body, {timeSent: editMessage.timeSent});
  messages.splice(messages.indexOf(editMessage), 1 , updatedMessage);
  res.status(200).send(updatedMessage);
})

app.post('/messages', function(request, response) {
  let message = {
    id : messages.length,
    from : request.body.from, 
    text : request.body.text,
    timeSent : new Date()
  }
  if(request.body.from !== '' && request.body.text !== ''){
    messages.push(message);
    response.status(200).send("Message received");
  }else{
    response.status(404).send("Please fill in appropriate fields.");
  }
  
});



app.listen(process.env.PORT || 4000);

