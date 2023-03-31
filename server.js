const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const allMessages = [
  { id: 0, from: "baz", text: "hi" },
  { id: 1, from: "bob", text: "hi" },
  { id: 2, from: "baz", text: "bye" },
  { id: 3, from: "bob", text: "bye" },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];
const messages = allMessages;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
  response.send("You are now live");
});

app.get("/messages", (req, res) => {
  res.status(200).send(messages);
});

app.get("/messages/:id", (req, res) => {
  // you need to check that the value of "idToFind" is actually a number, so we have to use the "Number()" method.
  const idToFind = Number(req.params.id);
  const message = messages.find((msg) => msg.id === idToFind);
  res.status(200).send({ message });
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).send({ newMessage });
});

app.delete("/messages/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  console.log(idToDelete);
  console.log(typeof idToDelete);

  const indexOfMessageToDelete = messages.findIndex(
    (msg) => msg.id === idToDelete
  );
  console.log(indexOfMessageToDelete);
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
