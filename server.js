const express = require("express");
const app = express();
const cors = require("cors");
PORT = 3005;

app.use(express.json());
app.use(express.urlencoded());
var _ = require("lodash");

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

//- [ ] Create a new message

app.post("/messages", function (req, res) {
  console.log(`POST /messages route`);

  let newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).json(`Please complete all fields`);
  } else {
    messages.push(newMessage);
    res.sendStatus(200);
  }
});

//- [ ] Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//- [ ] Read one message specified by an ID

app.get("/messages/:id", function (req, res) {
  console.log(`GET /messages/${req.params.id} route`);
  const id = parseInt(req.params.id);
  res.json(messages.find((element) => element.id === id));
});

//- [ ] Delete a message, by ID

app.delete("/messages/:id", function (req, res) {
  const deletedId = parseInt(req.params.id);
  let filteredArray = messages.filter((element) => element.id !== deletedId);
  // res.send(messages.find((element) => element.id != id));
  messages = filteredArray;
  // res.status(200).json({ success: deletedId });
  res.json(messages);
});

//LEVEL 2

app.post("/messages", function (req, res) {
  let noMessage = "";
  if (noMessage.length === 0) {
    console.log(`POST /messages route`);
  }
  res.status(404).json(`from field or text body cannot be empty`);
});
const listener = app.listen(PORT, function () {
  console.log(`Your server is listening on ${PORT}`);
});
