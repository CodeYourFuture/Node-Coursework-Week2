const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded());

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

// Get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//Send a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };
  console.log(req.body);
  messages.push(newMessage);
  res.json(messages);
});

//Read one message by id

const PORT = 8080;
app.listen(process.env.PORT || PORT);
