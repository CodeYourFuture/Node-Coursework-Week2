const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messageLists = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (req, res) {
  let newMessage = req.body;
  //  this will check if id is provide, exists already, if all false it will add to the message array.
  if (!newMessage.id) {
    res.status(400);
    res.send("Message Id required");
  } else if (messageLists.find((message) => message.id === newMessage.id)) {
    res.status(400);
    res.send("Message already exists");
  } else {
    messageLists.push(newMessage);
    res.status(201);
    console.log(newMessage);
    res.send(newMessage);
  }
});

//showing/reading all the messages  all the messages in the server
app.get("/messages", function (request, response) {
  response.send(messageLists);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
