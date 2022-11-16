const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// middleware calls JSON parse to convert the req. body into a JS data structure
app.use(express.json());
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

//create message/I used Postman
app.post('/messages', (req, res) => {
  const newMessage = req.body;
  newMessage.id = messages.length + 1;
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
