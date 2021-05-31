const express = require("express");
const cors = require('cors')
const app = express();
const messages = require("./Messages");
// const lodash = require("lodash");
app.use(cors());

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


// Read only the most recent 10 messages
app.get("/messages/latest", (request, response) => {
  response.status(200).json(messages.slice(-10))
})


//  Read only messages whose text contains a given substring:
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
    text: request.body.text,
    timeSent: new Date().toLocaleString() // store a timestamp in each message object, in a field called timeSent.
  }

  const uniqueMessageIdCheck = messages.some((message) => message.id === request.body.id);

  if (!newMessage.from || !newMessage.text) {
    return response.status(400).json({ msg: "Please include an author and message text" })
  }

  if (uniqueMessageIdCheck) {
    return response.status(400).json({ msg: "Message Id is already created, please select another message id" })
  }

  messages.push(newMessage);
  response.json(messages);
});


// Update the message
app.put("/messages/:id", (request, response) => {
  const isMessageIdFound = messages.some((message) => message.id === parseInt(request.params.id));

  if (isMessageIdFound) {
    const updatedMessage = request.body;
    messages.forEach((message) => {
      if (message.id === parseInt(request.params.id)) {
        message.from = updatedMessage.from ? updatedMessage.from : message.from;
        message.text = updatedMessage.text ? updatedMessage.text : message.text;
        message.timeSent = message.timeSent
        response.json({ msg: "Message updated", message })
      }
    })
  } else {
    response.status(400).json({ msg: `No message with the id of ${request.params.id}` })
  }
})


// Delete a message, by ID
app.delete("/messages/:id", (request, response) => {
  let isMessageIdFound = messages.some(message => message.id === parseInt(request.params.id));
  let deletedMessage;
  
  if (isMessageIdFound) {
    messages.forEach((message, index) => {
      if (message.id === parseInt(request.params.id)) {
        deletedMessage = message;
        messages.splice(index, 1);
      }
    })
    response.json({ msg: `Message Id ${request.params.id} deleted on ${new Date().toLocaleString()}`, deletedMessage })
  } else {
    response.status(400).json({ msg: `No message with the id of ${request.params.id}` })
  }
})


// Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  const isMessageIdFound = messages.some(message => message.id === parseInt(request.params.id))

  if (isMessageIdFound) {
    response.json(messages.filter((message) => message.id === parseInt(request.params.id)))
  } else {
    response.status(400).json({ msg: `No message with the id of ${request.params.id}` })
  }
});


// app.listen(process.env.PORT);
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
