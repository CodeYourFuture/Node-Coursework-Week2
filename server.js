const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let messageCounter = 1

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
  console.log(request.body);
  let newMessage = request.body
  newMessage.id = messageCounter++
  messages.push(newMessage)
  console.log(JSON.stringify(messages));
  response.sendStatus(201)
});

app.get("/messages", function (request, response) {
  response.send(messages)
});

app.get("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id)
  const message = messages.find(m => m.id === id)
  response.send(message)

})

app.listen(process.env.PORT || 4000);
