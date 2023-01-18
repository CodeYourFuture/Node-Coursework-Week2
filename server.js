const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const welcomeMessage = [
{
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
{
  id: 1,
  from: "Miguel",
  text: "Welcome to my world!",
},
{
  id: 2,
  from: "John",
  text: "Welcome to paradise!",
},];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
// get html page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// get all messages
app.get("/messages", function(req, res){
  res.status(200).send({messages});

});

//get message by ID

app.get("/messages/:id", function(req, res){
  const getMesssageById = Number(req.params.id);
  const singleMessage = messages.find((message) => message.id === getMesssageById);
  res.status(200).send({singleMessage});
  console.log(singleMessage);
  
});

//post new messages

app.post("/messages", function(req, res){
  console.log(req.body);

  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).send({newMessage});


});

//delete messages
 app.delete("/messages/:id", function(req, res){
  const getMesssageById = req.params.id;
  const messageToDelete = messages.filter((message) => message.id !== getMesssageById);
  res.status(200).send(messageToDelete);

 });



app.listen(9090 ||process.env.PORT, () => {
  console.log("my app is listenning port 9090");
});

