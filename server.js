const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
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

app.get("/messages", function (request, response) {
  response.json(messages);
});
// Read only the most recent 10 messages
app.get('/messages/latest', function (req, res){
  const recentMessages = messages.filter(i => i.id <= 10);
  res.send(recentMessages);
});

// app.post("/messages", function (request, response) {
//   let newMessage = request.body;
//   console.log(request.body);
//   newMessage.id = messages.length;
//   messages.push(newMessage);
//   response.send("Message submitted");
// });
app.post("/messages", function (request, response) {
  const newMessage = request.body;
  if (
    typeof newMessage.text == "string" &&
    newMessage.text.length > 0 &&
    typeof newMessage.from == "string" &&
    newMessage.from.length > 0
  ) {
    const id = messages.length;
    newMessage.id = id;
    messages.push(newMessage);
    response.json({ success: true });
  } else {
    response.status(400).send("Please add a proper message");
  }
});

app.get("/messages/:id", function (request, response) {
  let id=request.params.id;
  let foundMessage=messages.find(item => item.id ==id)
  response.json(foundMessage);
  
  app.delete("/messages/:id", function (request, response) {
const {id} = request.params;
messages= messages.filter((message) => message.id !=id)
response.json(messages);
  })
  app.listen(port);
  console.log("Port listening")
