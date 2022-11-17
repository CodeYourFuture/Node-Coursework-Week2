const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }))

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
const myMessage = {
  id: 1,
  from: "Alex",
  text: "Have a good day!"
};
const anaMessage = {
  id: 2,
  from: "Ana",
  text: "Hello!"

};


const messages = [welcomeMessage, myMessage, anaMessage];

//create message
//server accept JSON data so to get input from form we use this JS event handler(changes data from input in JSON)
// app.use(express.urlencoded({ extended: false }))
app.post('/messages', (req, res) => {
  const { from, text } = req.body;

  const newMessage = {
    id: messages.length,
    from,
    text,
    timeStamp: (TimeDate = new Date()),
  };


  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json("Please include a name and message");
  }
  messages.push(newMessage);
  res.send(messages)

});

//read all messages
app.get('/messages', (req, res) => {
  res.send(messages);
});


//read one message specified by an ID
app.get('/messages/:ID', (req, res) => {
  const { ID } = req.params;
  const messageWithReqId = messages.find(elem => elem.id == ID)
  res.send(messageWithReqId);
});

//delete a message, by ID/Postman
app.delete('/messages/:ID', (req, res) => {
  const ID = req.params.ID;
  // console.log(ID)
  const notDeletedMessages = messages.filter(elem => elem.id != ID);
  res.send(notDeletedMessages);
});



//read only messages whose text contains a given substring
app.get("/messages/search", function (req, res) {
  let messageRead = messages.filter((message) =>
    message.text.includes(req.query.text)
  );
  res.send(messageRead);
});

//read only the most recent 2 messages: /messages/latest
app.get("/messages/latest", function (req, res) {
  if (messages.length >= 2) {
    return res.send(messages.slice(messages.length - 2));
  } else {
    return res.send(messages);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server on port 3000'));
