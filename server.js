const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

let IdCounter = messages.length;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


// Read all messages
app.get("/messages", function (req, res) {
  res.send(messages)
})

// Create a new message
app.post("/messages", function (req, res) {
  const newPost = req.body;
  console.log(newPost);
  if (newPost.text && newPost.from) {
  newPost.id = IdCounter;
  IdCounter++;
  messages.push(newPost);
  } else {
    res.status(400).send('please enter a valid message')
  }
})

// Read message specified by Id
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  const message = messages.find((mes) => {
    return mes.id.toString() === id;
  });
  res.send(message);
})

// Read a message by given substring (query paramaters)
app.get("/messages/search", (req, res) => {
  let searchQuery = req.query.text;
  console.log(searchQuery)
  res.send("Hello World! You searched for " + searchQuery);
});


// Delete message specified by Id
app.post("/messages/delete", function (req, res) {
  const id = req.body.id;
  const message = messages.findIndex((mes) => {
    return mes.id.toString() === id;
  })
  if (message === -1) {
    return res.status(400).send('unable to find message id')
  }
  messages.splice(message, 1);
  res.send('Message deleted');
  })

app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});

