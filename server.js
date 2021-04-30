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
  res.status(200).json('Hello from the server');
});


//sends the messages back as stored in messages object.
app.get("/messages", (req, res) => {

  res.status(200).json(messages);
});

//read one message as specified by id
app.get("/message/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const message = messages.find((msg) => msg.id === id);

  message ? res.status(200).send(message) : res.status(404).send('Message not found');
});

//create 1 message



app.post("/message", (req, res) => {
  let newMessage = req.body;
  messages.push(newMessage);//pushes new message to the list of messages
  res.status(201).json(messages);

});




//get latest 10 messages
app.get("/messages/latest", (req, res) => {
  const recentMessages = messages.slice(Math.max(messages.length - 10, 0));
  if (messages.length < 10) res.json(messages);
  else res.json(recentMessages);
});



//delete 1 message by id
app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageIndex = messages.findIndex(message => message.id.toString() === id);
  messages.splice(messageIndex, 1);
  res.json({ message: `Message ${id} is deleted from the database.` });
});


app.listen(process.env.PORT || 3000);
