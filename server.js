const express = require("express");


const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
app.use(express.json())



const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get('/messages', function(request, response) {
  response.json(messages);
});

app.get("/messages/search", (req, res)=>{
  let text = req.query.text;
  if(text !== undefined){
      let  result = messages.filter(message =>message.text.toLowerCase().includes(text.toLowerCase()));
if(result.length < 1){
    res.status(400).json(`Please enter a valid search term!`)
  }else{
    res.json(result)
  }
  }
})

app.get("/messages/latest", (req, res)=>{
    let latest = messages.slice(-5)
  if(messages.length < 5){
    res.json('You have less than messages')
  }

  res.json(latest)
})


app.get('/messages/:id', function(request, response) {
  let messageId = Number(request.params.id)
  let result = messages.find(message=> message.id === messageId)
  response.json(result);
});



app.delete('/messages/:id', function(request, response) {
  let messageId = Number(request.params.id)
  let index = messages.findIndex(message=> message.id === messageId)
  let deleted = messages.splice(index, 1)
  response.json(messages);
});


app.post('/messages', function(request, response) {
let today = new Date()
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time = today.getHours() + 1 + ":" + today.getMinutes() + ":" + today.getSeconds();
let timeSend = date  + " " + time;
  let newMessage = {
  id: messages.length,
  from: request.body.from,
  text: request.body.text,
  timestamp : timeSend
}
    if(newMessage.from && newMessage.text){
   messages.push(newMessage)
  } else {
    response.status(400).json('Add name and message')
  }
  
  response.json(messages);
});
  app.put('/messages/:id', function(request, response) {
    let messageId = Number(request.params.id)
let selectMessage = messages.find(message => message.id == messageId)

  
  if(selectMessage){
   selectMessage.from = request.body.from
    selectMessage.text = request.body.text
  } else {
    response.status(400).json('Add a valid message id')
  }
  
  response.json(messages);
});






app.listen(process.env.PORT);