const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 9001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors())
 
const welcomeMessage = {
  timeSent:new Date().toLocaleDateString(),
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]


app.get('/',(request, response)=> {
  response.sendFile(__dirname + '/index.html');
});

app.get("/messages", (request, response)=> {
  response.send(messages);
});


app.get("/messages/latest", function(req,res){
  const latestMessages= messages.filter((message ,index)=>messages.length-10 <= index);
  res.send(latestMessages)
});
 



app.post("/messages", function (request, response) {
  if (request.body.from.length===0 || request.body.text.length === 0)
    response.status(404).send("message is empty");
  messages.push({id:messages.length,
                   timeSent:new Date().toLocaleDateString(),
                 ...request.body});
});


app.delete('/messages/:id', function(request, response){
  messages= request.params.id?messages.filter((message)=>message.id !== Number(request.params.id)):messages
 response.status(200).send("delete messages")
});

app.get("/messages/search/:id", function(req,res){
  const filteredMessages= messages.filter((message)=>message.text.includes(req.query.text))
  res.send(filteredMessages)
});


app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
});
// process.env.PORT