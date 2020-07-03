const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors')
const _ = require("lodash");
let messages = require("./messages.json")

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

//create new message
app.post("/messages", function (request, response) {

  if (request.body.text && request.body.from) {
    const timeSent = new Date();
    const newMessage = { ...request.body, timeStamp: timeSent };
    messages.push(newMessage);
    response.send({ success: true, newMessage });
  }
  else { response.send(400, "Message could not send !"); }

})
//read all messages
app.get("/messages", function (request, response) {
  response.send(messages)
})

// search text
app.get('/messages/search', (request, response) => {
  const searchTerm = request.query.text
  response.json(messages.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase())))
})

//getting latest 10 messages
app.get("/messages/latest", function (request, response) {
  response.send(_.takeRight(messages, 10));
})

//search by Id
app.get('/messages/:id', function (request, response) {
  const personId = Number(request.params.id);
  const selectById = messages.find(item => item.id === personId);
  selectById ? response.send(selectById) : response.status(404).send("No message found");

})
//delete by Id
app.delete("/messages/:id", function (request, response) {
  const personId = Number(request.params.id);
  messages = messages.filter(item => item.id !== personId);
  response.send({ success: true })
})


const port = process.env.PORT || 5000;
app.listen(port);

