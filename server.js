const express = require("express");
const cors = require("cors");
const app = express(); // creates an instance of an express server


app.use(express.json()); // to support JSON-encoded bodies
app.use(cors()); // Cross Origin Resource Sharing









//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};



const messages = [welcomeMessage];

// challenge 1

// 1- Create a new message +  validation 

app.post("/messages", function (request, response) {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    response.status(400).json({ msg: "Please include a name and a text" });
  }

  messages.push(newMessage);
  response.json(messages);
});




//  2- read all messages
app.get("/Messages", function (request, response) {
  response.send({ messages }).json;
});

//read one message specified by an ID
app.get("/readMessages/:id", function (request, response) {
  const id = Number(request.params.id); // the id is a string, so we need to convert it to a number
  const message = messages.find((message) => message.id === id);
  response.send(message);
});


// 3- delete a message, by ID

app.delete("/deleteMessages/:id", function (request, response) {
  const id = Number(request.params.id);
  const message = messages.find((message) => message.id === id);
});

// search for messages containing a given string
app.get("/search", function (request, response) {
  
  const search = request.query.text;
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(search.toLowerCase())
  );
  response.send(filteredMessages);
});

// read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", function (request, response) {
  const latestMessages = messages.slice(-10);
  response.send(latestMessages);
});




/////////////////////// DO NOT TOUCH BELOW CODE ///////////////////////////

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
