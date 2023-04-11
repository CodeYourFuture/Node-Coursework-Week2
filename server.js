const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser")
const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

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

app.get('/messages', function(request, response) {
  response.json(messages)
});

app.get("/messages/latest", (request, response) =>{
  const latest = messages.slice(messages.length-10, messages.length);
  console.log(latest)
  return response.status(200).json({success:true, data:latest})
})

app.get('/messages:id', function(request, response) {
  let messageId=request.params.id
  let messagefind= messages.find(messageObject => messageObject.id===+messageId)
  response.json(messagefind)
});


app.post("/messages", (request, response) => {
  const { from, text } = request.body;
  if(!from || !text){
    return response.status(400).json({error:true, message:"there is an error!"})
  };
  let newMessage= {
    id: messages.length,
    from,
    text,
  };
  messages.push(newMessage);
  response.status(201).json({success:true, data:messages })
});

app.delete("/messages/:id", function (request, response) {
  const messageId=request.params.id;
  let messageToDelete= messages.find((message) => message.id===+messageId);
  let messageToDeleteIndex=messages.indexOf(messageToDelete)
  messages.splice(messageToDeleteIndex,1)
  response.send(messages)
 });   


app.listen(3000, () => {
  console.log(`Your app is listening on port 3000` );
});
