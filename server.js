const express = require("express");
const cors = require("cors");
let PORT = 3000;
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
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// read first message

app.get("/messages", function (request, response) {
  response.json({
    data: messages,
    message: "ok",
  });
});

// post/ create new message..

app.post("/messages", function (req, res) {
  let newMessages = req.body;
  messages.push({
    id: messages.length,
    from: newMessages.from,
    text: newMessages.text
    // ...newMessages, // this works as same as above {from: newMessages.from,text: newMessages.text}
  });
  console.log(newMessages)
  res.json({
    data: messages,
    message: "new message added",
  });
});
