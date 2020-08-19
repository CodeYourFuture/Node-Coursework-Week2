const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get('/messages', function (request, response) {
  response.json(messages)
})

app.post('/messages', function (request, response) {
  let newMessage = {};

  if (request.body.from.trim() && request.body.text.trim()) {
    newMessage.id = messages.length
    newMessage.from = request.body.from
    newMessage.text = request.body.text
    newMessage.timeSent = new Date()
    messages.push(newMessage)
    response.json(messages)
  } else {
    response.status(400).json("Please fill all fileds")
  }

})

app.get('/messages/search', function (request, response) {
  let searchWord = request.query.text
  let result = messages.filter(item => item.text.toLowerCase().includes(searchWord.toLowerCase()))
  if (result.length > 0) {
    response.json(result)
  } else {
    response.status(404).json("Nothing was found")
  }
})

app.get('/messages/latest', function (request, response) {
  let latestMessages = messages.splice(-2)
  response.json(latestMessages)
})

app.get('/messages/:id', function (request, response) {
  let id = parseInt(request.params.id)
  let result = messages.find(item => item.id === id)
  if (result !== undefined) {
    response.json(result)
  } else {
    response.json("not found")
  }
})

app.delete('/messages/:id', function (request, response) {
  let id = parseInt(request.params.id),
    result = messages.find(item => item.id === id),
    index = messages.indexOf(result);
  messages.splice(index, 1)
  response.json(messages)
})

app.listen(process.env.PORT);
