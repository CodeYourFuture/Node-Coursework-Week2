const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const bp = require('body-parser')
const port = 3000

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(-10));
});

app.get("/messages/search", function (request, response) {
  let textSearch = request.query.text;

  response.json(messages.filter(msg => msg.text.includes(textSearch)))
});

app.get("/messages/:id", function (request, response) {
  const messageId = parseInt(request.params.id)
  
  let foundMessage = messages.find( msg => msg.id === messageId)
  
  if (foundMessage) response.json(foundMessage)
  else response.send({ msg: `Could not find message with ID, ${messageId}` })
});

app.post("/messages", (request, response) => {
  let newMessage = request.body
  if ( newMessage.from === "" || newMessage.text === "" ) {
    response.status(400)
    response.send({ msg: "Please complete the form "})
  } 
  else {
    newMessage.id = messages.length
    messages.push(newMessage)
    response.send({ msg: "Message sent successfully" })
  }
})

app.delete("/messages/:id", (request, response) => {
  const messageId = parseInt(request.params.id)

  messages = messages.filter( msg => msg.id === messageId )
  messages = messages.map( (msg, index) => msg.id === index )

  response.send({ msg: "Message deleted", array: [...messages] })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})