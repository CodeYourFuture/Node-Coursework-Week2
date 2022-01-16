const express = require("express");
const cors = require("cors");

app.use(cors());
app.use(express.json()); //All message content should be passed as JSON
app.use(express.urlencoded({extended: false}));

// to create message objects which contain text, user and ID of the message
class MessageItem {
  constructor({text, from}){
    // for when no message is not sent, then the id=0
  this.id = message.length===0? 0: messags[messages.length-1].id + 1;
  this.from = from;
  this.text = text;
  this.timeSent = new Date();
  }
}
// Validate the parameterstring has any content which is not a whitespace
const validateMessageString = (string) => string.trim().length >0;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


let messages = [];

message.push(
  new messageItem ({
    from: "Bart",
    text: "Welcome to the CYF Chat System!";
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Read (GET) all messages  
app.get("/messages". (req, res) =>{ 
  res.json(messages);
})

//Read (GET) only the most recent 10 messages: `/messages/latest`

app.get("/messages/latest", (req, res) => { 
  const amount = req.query.amount || 10;
  const latestMessage = message.slice(0, parseInt(amount) + 1);
  res.json (latestMessage);
});


// Read (GET) one message specified by an ID
app.get("/message/:id", function (req, res) { 
  console.log (req.body);
  const id = parseInt(req.params.id);
  const payload = req.body;
  const index = message.findIndex((message) => message.id ===id);
 
  if(index === -1)
  return res.status(400).json ({messages: "Message ID not found"});

  message[index].from = payload.from;
  messages[index].text = payload.text;
  res.json({message: "Message has been updated"});
});

// Delete a message base onID
app.put("/message/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const payload = req.body;
  const index = message.findIndex((message) => message.id=== id);// to get the index of the message who's ID matches the param ID
  if(index === -1){
    return res. status(400).json({messages:"message ID not found"});
  }
  message.splice(index, 1); 
  res.json({message: "Message successfully removed"});
});

//Read (GET) only the most recent 10 messages: `/messages/latest`

app.get("/messages/latest", (req, res) => { 
  res.send (messages.slice(-10));
});

// Create (POST) a new message  
app.post("/message", function (req, res) { 
  const message = new MessageItem(req.body);
  const messageTextValid = validateMessageString(message.text);
  const messageFromValid = validateMessageString(messages.from);

  if(!messageTextValid && messageFromValid){
    return res.status(400).json({message: "Message was not sent successfully"});
  }

  message.push(message);
  res.status(200).json({message: "Message send successfully", newMessage: message});
});



// Read (GET) one message specified by an ID




 // level 2 _reject_ requests to create messages if the message objects have an empty or missing `text` or `from` property.

//  const missingMessage
//     if (missingMessage.from.length || missingMessage.text.length ===0) {
//       res.status(400); // Bad request
//       res.send({ message: "Request rejected because message content is empty" });
//     }


const PORT = process.env.PORT||3000;

app.listen(3000, () => console.log("Running on port 3000"));
