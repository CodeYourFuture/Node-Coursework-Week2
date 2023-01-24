const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
const messages = [welcomeMessage];


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT);

// Port setting.
app.listen(9090, ()=>{
  console.log("Waiting for your action")
});

// Reading messages at this point
  app.get("/messages", (req,res)=>{
  res.status(200).send({ messages })
});

//Creating messages

app.post("/messages", (req, res)=>{
const newMessage = (req.body)
 messages.push(newMessage)
 res.status(201).send({newMessage})
});

// Reading one message specified by an ID
app.get("/messages/:id", (req,res)=>{
const newIdToFind = Number(req.params.id)
  const message = messages.find((message) => message.id === newIdToFind)
  res.status(200).send(message)
});

// Deleting a message by ID
app.delete("/messages/:id", (req, res)=>{
  const messageToDelete = Number(req.params.id)
  const message = messages.filter(message => message.id !== messageToDelete)
  res.status(200).send({message})
});
 
// ** Level 2 start below **

app.post("/messagespost", (req, res) => {
  const newMessage = (req.body)
  let {from, text} = newMessage
  if ( from !== "" &&  text!=="" && from !== undefined && text!== undefined ){
  messages.push(newMessage)
  res.status(201).send({ newMessage })}
  else {
    res.status(400).send("Missing Info");
  }
});

// ** Read _only_ messages whose text contains a given substring**
app.get("/messages/search?text=express", (req, res) => {
   const term = req.query.text
   if(term)
    res.send(messages.filter((message) => message.quote.includes(term)));
    else
    res.status(400).send("Not found")
});

// ** Read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});



