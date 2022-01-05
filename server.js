const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date()
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//To display all messages
app.get("/messages", (req, res) => {
  res.send(messages);
})

//To create new message
app.post("/messages", (req, res) => {
  const newId = +(Math.random() * messages.length).toFixed(3);
  const newMsg = {
    id: newId,
   from: req.body.from,
   text: req.body.text,
   timeSent: new Date()
  }
  if (messages.find(msg => {
    if (msg.from === newMsg.from && msg.text === newMsg.text) {
      return true;
    }
  })) 
  {
    res.status(409).send({msg: "Same message by same same sender already exist!"})
  }
  else if (newMsg.from && newMsg.text) {
    messages.push(newMsg);
    res.status(201).send(newMsg);
  } else {
    res.status(400).send({msg: "Message incomplete!"})
  }
});

//To read 1 message specified by an id
app.get("/messages/:id", (req, res) => {
  const msgId = +req.params.id;
  if (messages.some(msg => msg.id === msgId)) {
    res.status(200).send(messages.find(msg => msg.id === msgId))
  } else {
    res.status(400).send({msg: "message with this id not found!"})
  }
})



//To delete a message by an id
app.delete("/messages/:id", (req, res) => {
  const msgId = +req.params.id;
  if (messages.some(msg => msg.id === msgId)) {
    const msgIndex = messages.indexOf(messages.find(msg => msg.id === msgId));
    messages.splice(msgIndex, 1);
    res.status(204).json({msg: "Message deleted"});
  } else {
    res.status(400).json({msg:"Message with this id doesn't exist!"})
  }
})

//------Extra read functionality-------
//Search messages containing search term
app.get("/msg/search", (req, res) => {
  const searchMsg = req.query.word;
  const targetMsg = messages.filter(msg => msg.text.toLowerCase().includes(searchMsg.toLowerCase()));
  if (targetMsg) {
    res.status(200).send(targetMsg);
  } else {
    res.status(408).send({msg: "Message not found!"});
  }
})

//Showing 10 latest messages
app.get("/msg/latest", (req, res) => {
  res.send(messages.slice(-10));
})

//process.env.PORT
const listener = app.listen(5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});