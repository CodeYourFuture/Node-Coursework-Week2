const express = require('express');
const cors = require('cors');
const Joi = require('joi');

const app = express();
app.use(express.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
  timeStamp: new Date().toLocaleString(),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [
  welcomeMessage,
  {
    id: 1,
    from: 'Taslima',
    text: 'Welcome to our code your future',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    from: 'Aysha',
    text: 'Welcome to my nursery!!!',
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    from: 'Khadijah',
    text: 'Welcome to my school!!!',
    timestamp: new Date().toLocaleString(),
  },
];

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

//read all messages
app.get('/messages', function (request, response) {
  response.send(messages);
});

//create a new message.
app.post('/messages', (request, response) => {
  //error handling using joi package manager
  const schema = {
    from: Joi.string().min(3).required(),
    text: Joi.string().min(3).required(),
  };
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400).send(result.error.details[0].message);
    return;
  }
  const message = {
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text,
    timestamp: new Date().toLocaleString(),
  };
  messages.push(message);
  response.send(message);
});

//read one message specified by id
// app.get('/messages/:id', function (request, response) {
//   const messageId = request.params.id;
//   const result = messages.find((message) => message.id === parseInt(messageId));
//   if (!result) {
//     result.status(404).send('The message with given id is not found');
//   }
//   response.send(result);
// });
//delete a message by id
//look up the course
//not existing,return 404

app.delete('/messages/:id', (req, res) => {
  const messageId = req.params.id;
  //validation
  const message = messages.find(
    (message) => message.id === parseInt(messageId)
  );
  if (!message)
    res.status(404).send('The message with given Id does not exist');
  //delete
  const index = messages.indexOf(message);
  messages.splice(index, 1);
  //return response back to user
  res.send(message);
});

//search functionality
app.get('/messages/search', function (req, res) {
  const {text, latest} = req.query;
  let foundMessages = messages;
  if (text !== undefined) {
    foundMessages = messages.filter((message) =>
      message.text.toLowerCase().includes(text.toLocaleLowerCase())
    );
  }
  if (latest !== undefined) {
    foundMessages = messages.slice(0, parseInt(latest));
  }

  res.send(foundMessages);
});

//update functionality
app.put('/messages/:id', (req, res) => {
  //look up the message if message does not exist return 404.
  const message = messages.find(
    (message) => message.id === parseInt(req.params.id)
  );
  if (!message)
    res.status(404).send('The message with given id does not exist');

  //validate course make sure if its in good shape
  const schema = {
    from: Joi.string().min(3).required(),
    text: Joi.string().min(3).required(),
  };
  //if invalid we return 400 bad request
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //update the course.
  message.text = req.body.text;
  message.from = req.body.from;
  //return the updated course to the client.
  res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` up and running! on port${port}`);
});
