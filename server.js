const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
const welcomeMessage = 
{
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
}

  

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
// get html page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// get all messages
app.get("/messages", function(req, res){
  res.status(200).send({messages});

})
//post new messages

app.post("/messages", function(req, res){
  console.log(req.body);

  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).send({newMessage});


});

//get message by ID

  
app.get("/messages/:id", function(req, res){
  const getMesssageById = Number(req.params.id);
  const singleMessage = messages.find((message) => message.id === getMesssageById);
  
  if(singleMessage){
    res.status(200).send(singleMessage);
  }else{
    res.status(404).send("not found");
  }
  
});



//delete messages
 app.delete("/messages/:id", function(req, res){
  const getMesssageById = +req.params.id;
  messages = messages.filter((message) => message.id !== getMesssageById);
  res.status(200).send(messages);


 });


   // get/read only especific message
   app.get("/messages/search", (req, res) => {
    const serchTextMessage = req.query.text.toLocaleLowerCase();
    const filterText = messages.filter(message => message.from.toLocaleLowerCase().includes(serchTextMessage) || eachMessage.text.toLocaleLowerCase().includes(serchTextMessage));
    res.status(200).send(filterText);
  });

  // put/ update message

  


app.listen(9090 ||process.env.PORT, () => {
  console.log("my app is listenning port 9090");
});

