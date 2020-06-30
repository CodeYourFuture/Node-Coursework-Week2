const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');

const app = express ();

app.use (bodyParser.json ());
app.use (cors ());

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get ('/', function (request, response) {
  response.sendFile (__dirname + '/index.html');
});
//  Create a new message
app.post ('/messages', (req, res) => {
  const message = req.body;
  messages.push (message);
  res.json (message).status (201);
});

//  Read All messages
app.get ('/messages', (req, res) => {
  res.json (messages);
});

//  Read one message specified by an ID
app.get ('/messages/:id', (req, res) => {
  const {id} = req.params;
  const message = messages.find (msg => msg.id === Number (id));
  message ? res.json (message) : res.sendStatus (404);
});

//  Delete a message by ID
app.delete ('/messages/:id', (req, res) => {
  const {id} = req.params;
  const indexToDelete = messages.findIndex (msg => msg.id === Number (id));
  if (indexToDelete) {
    messages.splice (indexToDelete, 1);
    res.sendStatus (204);
  } else {
    res.sendStatus (404);
  }
});

//  update a message by ID
app.put ('/messages/:id', (req, res) => {
  const {id} = req.params;

  const updatedMessage = req.body;

  const existingMessage = messages.find (msg => msg.id === Number (id));
  if (existingMessage) {
    existingMessage = updatedMessage;
    res.json (existingMessage);
  } else {
    res.sendStatus (404);
  }
});

const port = process.env.PORT || 5000;
app.listen (port);
