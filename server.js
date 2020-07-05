const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();

app.use(cors());


app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

let newMessages = [
  {
    id: 1,
    from: "Me",
    text: "Hello"
  },
  {
    id: 2,
    from: "You",
    text: "Hello, Hello!"
  },
  {
    id: 3,
    from: "Me",
    text: "How are you? express"
  }
];
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
newMessages.map(message => messages.push(message));

app.get("/messages", function(req, res) {
  res.send(messages);
});

app.post("/messages", function(req, res) {
  const addMessage = req.body;
  !addMessage.from || !addMessage.text  ?
  res.send(404) :
  messages.push(addMessage);
  res.send({ success: true });
});

app.get("/messages/search", function(req, res) {
  let searchText = req.query.text;
  let filteredMessages = messages.filter(message =>
    message.text.includes(searchText)
  );
  res.send(filteredMessages);
});

app.get("/messages/latest", function(req, res){
  let latest = messages.slice(-10)
  res.send(latest)
})

app.get("/messages/:id", function(req, res) {
  let messageId = req.params.id;
  res.send(messages.find(message => message.id == messageId));
});

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.delete("/messages/:id", function(req, res) {
  let messageId = req.params.id;
  messages = messages.filter(message => message.id.toString() !== messageId);
  res.send(messages);
});

let port = process.env.PORT;

app.listen( port || 3000 );
