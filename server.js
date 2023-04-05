const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// read all messages
app.get("/messages", function(req,res) {
  res.json(messages);
})

// read a message by id
app.get("/messages/:id", function(req, res) {
  const messageId = req.params.id;
  const findId = messages.find((message) => { return message.id === Number(messageId) });
    if (findId) {
    res.json(findId);
    console.log(findId);
  } else {
    res.status(404).send("Message not found");
  }
});


// create a new message
app.post("/messages", function (req, res) {
  const {from, text} = req.body
  const newMessage = {
     id: messages.length,
     from,
     text,
   };

  console.log(newMessage);
  messages.push(newMessage);
  res.status(201).json({ success: true, data: messages });
  // response.json(request.body);
  // messages.push(request.body);
  //console.log(messages);
});

// delete message by id
app.delete("/messages/:id", function (req, res) {
  const messageId = req.params.id;
  const findIndex = messages.findIndex((message) => { return message.id === Number(messageId) });

  if (findIndex === -1) {
    res.status(404).send("Message not found");
  } else {
    messages.splice(findIndex, 1);
    res.status(204).send();
  }
});




app.listen(process.env.PORT);
