const express = require("express");
const cors = require("cors");
const { response, request, json } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.listen(PORT);
console.log(PORT);

const welcomeMessage = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const welcomeMessageTwo = {
  id: 2,
  from: "Bimbola",
  text: "Hello to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = [welcomeMessage,welcomeMessageTwo];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages/latest",  (request,response) =>{
  response.send(messages.slice(-10))
})
//Create a new message

app.post("/messages",  (req, res) =>  {
  const text = req.body.text;
  const from = req.body.from;
  if(!text || !from){
return res.status(400).send("error message")
  }
  const newMessage = {
    id: messages.length,
    from: from,
    text: text,
  };
  messages.push(newMessage)
  res.json(messages);
});

//Read all messages
app.get("/messages", (request,response)=>{
  response.send(messages);
})
// Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  //root
  let { id } = request.params;
  id = parseInt(id);
  const findInboxMessage = messages.find((message) => message.id === id);
  if(findInboxMessage === undefined){
    return response.status(400).send("error check id ")
  }
  response.json(findInboxMessage);
});

//Delete a message, by ID
app.delete("/messages/:id", (request, response)=> {
  let { id } = request.params;
  id = parseInt(id);
  const deleteMessageIndex = messages.findIndex((message) => message.id === id);
messages.splice(deleteMessageIndex,1)
response.send(messages)
})
