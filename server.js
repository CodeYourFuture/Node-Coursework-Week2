const express = require("express");
let messages = require("./messages.json");
const cors = require("cors");
const timestamp = require('time-stamp')

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage]

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get('/messages/search/', (req, res) => {
  const text = req.query.text
  res.json(messages.filter(message => message.text.includes(text)))
})

app.get('/messages/lates', (req, res) => {
  res.json(messages.slice(messages.length-10, messages.length))
})

app.get("/messages/:messageId", (req, res) => {
  const { messageId } = req.params;
  res.json(messages.find(message => message.id == messageId));
});

app.post("/messages", (req, res) => {
  if (req.body.from.length > 0 && req.body.text.length > 0) {
    req.body ["timeSent"] = timestamp('YY/MM/DD - HH:mm:ss')
    messages.push(req.body);
    console.log("value: ", (req.body.from.length));
    res.json({ "message send": true });
  } else {
    res.status(400).json( {"message not send": true} );
  }
});

app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  messages = messages.filter(message => message.id != messageId);
  res.json({ "Message deleted": true });
});

app.listen(process.env.PORT || 5000);
