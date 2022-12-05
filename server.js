const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.use(express.json()); // before our routes definition

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Create a new message
app.post("/messages", function (req, res) {
  console.log("POST /messages route");
  let newMessage = req.body;
  // if(!Object.keys(newMessage).length) {
  if (!(req.body.from || req.body.text)) {
    res.status(400).send("No message entered");
  } else {
    messages.push(newMessage);
    res.status(200).send(messages);
    // console.log(req.body);
  }
});

// Read all messages
app.get("/messages", (req, res) => {
  res.status(200).send(messages);
});

//  Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  res.status(200).send(messages.filter((message) => message.id === id));
  console.log(messages.filter((message) => message[id] === id));
});
//  Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = messages.filter((message) => message.id === id);
  messages = result;
  console.log("DELETE /messages route");
  res.status(200).send(result);
});

//  Update a message, by ID
app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const messageIndex = messages.findIndex((element) => element.id === id);
  messages[messageIndex] = req.body;
  // With DB, we do an "Update" statement
  res.status(200).send(messages);
});

//  All message content should be passed as JSON.

// level 2

// app.get("/messages/:id", (req, res) => {
//   console.log(req.params.id);
//   const id = parseInt(req.params.id);
//   res.status(200).send(messages.filter((message) => message.id === id));
//   console.log(messages.filter((message) => message[id] === id));
//   let from = req.params.from;
//   let text = req.params.text;
// });

let port = 3001 || process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
