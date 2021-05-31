const express = require("express");
const cors = require('cors')
const app = express();
const messages = require("./Messages")
app.use(cors())

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Upload index.html file
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


// Read all messages
app.get("/messages", (request, response) => {
  response.json(messages)
});


// Search by a term
app.get("/messages/search", (request, response) => {
  const term = request.query.term;

  const filteredMessage = messages.filter(message => message.text.toLowerCase().includes(term.toLowerCase()) || message.from.toLowerCase().includes(term.toLowerCase()));

  response.send(filteredMessage)
})


// Create a new message
app.post("/messages", (request, response) => {
  const newMessage = {
    id: request.body.id,
    from: request.body.from,
    text: request.body.text
  }

  const uniqueMessageIdCheck = messages.some((message) => message.id === request.body.id)

  if (!newMessage.from || !newMessage.text) {
    return response.status(400).json({ msg: "Please include an author and message text" })
  }

  if (uniqueMessageIdCheck) {
    return response.status(400).json({ msg: "Message Id is already created, please select another message id" })
  }

  messages.push(newMessage);
  response.json(messages);
});


// Delete messages
app.delete("/messages/:id", (request, response) => {
  let isMessageIdFound = messages.some(message => message.id === parseInt(request.params.id))

  if (isMessageIdFound) {
    response.json({ msg: "Message deleted", messages: messages.filter((message) => message.id !== parseInt(request.params.id)) })
  } else {
    response.status(400).json({ msg: `No member with the id of ${request.params.id}` })
  }
})


// Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  const isMessageIdFound = messages.some(message => message.id === parseInt(request.params.id))

  if (isMessageIdFound) {
    response.json(messages.filter((message) => message.id === parseInt(request.params.id)))
  } else {
    response.status(400).json({ msg: `No member with the id of ${request.params.id}` })
  }
});


// app.listen(process.env.PORT);
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
