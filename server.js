const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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


// Read all messages
app.get("/messages", function (request, response) {
  response.send(messages);
});

//Create a new message
app.post("/messages", (request, response) => {
  const message = {
    id: messages[messages.length - 1].id + 1,
    from: request.body.from,
    text: request.body.text,
  } 
  messages.push(message)
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.json(messages)
})

//Read one message specified by an ID
app.get("/messages/:messageId", (req, res) => {res.send(
  messages.filter(item => item["id"] == req.params.messageId))})

//Delete a message, by ID
app.delete("/messages/:messageId", (req, res) => {
  const id = Number(req.params.messageId);
  const index = messages.findIndex((message) => message.id === id);
  if (index >= 0) {
    messages.splice(index, 1);
    res.status(204).send("Message deleted");
  } else {
    res.status(404).send("Message not found");
  }
});

//Level 3 - more "read" functionality
app.get('/quotes/search', (request, response) => {
  let searchQuery = request.query.text.toLowerCase()
  response.send(messages.filter(item => 
     item.text.toLowerCase().includes(searchQuery) 
  ))
})

//listening on port number
const listener = app.listen(process.env.PORT || 3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
