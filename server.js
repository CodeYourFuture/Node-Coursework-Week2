const express = require('express');
const cors = require('cors');
const allMessages = require('./data/chatMessages.json');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', function (request, response) {
  response.json(allMessages);
});

app.get('/messages/:messageId', function (req, res) {
  const { messageId } = req.params;
  const responseObject = allMessages.find((message) => message.id == messageId);
  responseObject
    ? res.json(responseObject)
    : res.send(`Message with ID: ${messageId} was not found`);
});

app.post('/messages', function (req, res) {
  const newMessage = req.body;
  if (newMessage.from && newMessage.text) {
    newMessage.id = allMessages.length;
    //newMessage.timeSent = newDate();
    allMessages.push(newMessage);
    res.send('Message sent successfully!');
  } else {
    res.status(400).send("Both sender's name and the text message is required");
  }
});

app.delete('/messages/:messageId', function (req, res) {
  const { messageId } = req.params;
  const responseObject = allMessages.find((message) => message.id == messageId);

  if (responseObject) {
    allMessages.splice(allMessages.indexOf(responseObject), 1);
    res.send(`Message #${messageId} deleted!`);
  } else {
    res.status(400).send(`Message with ID: ${messageId} was not found`);
  }
});

app.listen(process.env.PORT || 3000);
