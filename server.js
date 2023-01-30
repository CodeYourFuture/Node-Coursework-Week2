require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!'
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

const validateMessage = (message) => {
  if (!message.from || !message.text) {
    return false;
  }
  return true;
};

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', (req, res) => {
  res.send(messages);
});
app.get('/messages/latest', (req, res) => {
  res.send(
    messages.length <= 10 ? messages : messages.slice(messages.length - 10)
  );
});
app.get('/messages/search', (req, res) => {
  res.send(messages.filter(({ text }) => text.includes(req.query.text)));
});

app.get('/messages/:messagesId', (req, res) => {
  res.send(messages.filter(({ id }) => id === +req.params.messagesId));
});

app.post('/messages', (req, res) => {
  const isValid = validateMessage(req.body);
  if (!isValid) {
    return res.status(400).json(`Your name or message are missing.`);
  }

  messages.push({
    ...req.body,
    id: messages[messages.length - 1].id + 1,
    timeSent: new Date().toUTCString()
  });
  return res.send(messages);
});

app.put('/messages/:messagesId', (req, res) => {
  const index = messages.findIndex(({ id }) => id === +req.params.messagesId);
  const isValid = validateMessage(req.body);
  if (!isValid) {
    return res.status(400).json(`Your name or message are missing.`);
  }
  if (index === -1) {
    return res.status(404).json(`no message with id ${req.params.messagesId}`);
  }
  messages[index] = {
    ...messages[index],
    ...req.body
  };
  return res.send(messages);
});
app.delete('/messages/:messagesId', (req, res) => {
  messages = messages.filter(({ id }) => id !== +req.params.messagesId);
  res.send(messages);
});
app.listen(process.env.PORT);
