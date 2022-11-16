const express = require("express");
const app = express();
// const { request } = require("express");
// const { response } = require("express");
// const res = require("express/lib/response");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

const welcomeMessage = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
const myMessage = {
  id: 2,
  from: "Alex",
  text: "Have a good day!"
};
const anaMessage = {
  id: 3,
  from: "Ana",
  text: "Hello!"

};
// const newMessage = {
//     id: 4,
//     from: "Ioana",
//     text: "Welcome!"   
// }

// //This array is our "data store".
// //We will start with one message in the array.
// //Note: messages will be lost when Glitch restarts our server.

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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server on port 3000'));
