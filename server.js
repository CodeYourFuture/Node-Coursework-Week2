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

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.send(messages)
})

app.post("/messages", function (req, res) {
  const newPost = req.body;
  newPost.id = messages.length;
  messages.push(newPost);
})

app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  const message = messages.find((mes) => {
    return mes.id.toString() === id;
  });
  res.send(message);
})

app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});

