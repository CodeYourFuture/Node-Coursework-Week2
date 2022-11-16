const express = require("express");
const app = express();
const cors = require("cors");
PORT = 3005;

app.use(express.json());
app.use(express.urlencoded());

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
  // const newMessage = req.body;
  console.log(req.body);
  messages.push(req.body);
  res.sendStatus(200);
});

//- [ ] Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//- [ ] Read one message specified by an ID

app.get("/messages/:id", function (req, res) {
  console.log(`GET /messages/${req.params.id} route`);
  const id = parseInt(req.params.id);
  res.send(messages.find((element) => element.id === id));
});

//- [ ] Delete a message, by ID

app.delete("/messages/:id", function (req, res) {
  const deletedId = req.params.id;
  let filteredId = messages.filter((element) => element.id !== deletedId);
  // res.send(messages.find((element) => element.id != id));
  messages = filteredId;
  res.status(200).json({ success: deletedId });
});

const listener = app.listen(PORT, function () {
  console.log(`Your server is listening on ${PORT}`);
});
