const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())
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


// send a message confirming the server works
app.get("/test", (req, res) => {
  res.status(200).send('Hello from the server');
});


//sends the messages back as stored in messages object.
app.get("/messages", (req, res) => {
  res.status(200).send(messages);
});

//read one message as specified by id
app.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);

  message ? res.status(200).send(message) : res.status(404).send('Message not found');
});

//create a message
app.use(express.json());
app.post("/message", (req, res) => {
  let newMessage = req.body;
  messages.push(newMessage);//pushes new message to the list of messages
  res.status(201).json(messages);

});

//delete a message
app.delete("/message/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const index = messages.findIndex((message) => message.id === messageId);
  if (index !== -1) {
    messages.splice(index);
    response.status(204).send("success");
  }
});


app.listen(process.env.PORT || 3000);
