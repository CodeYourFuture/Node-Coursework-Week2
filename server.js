const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/messages", function (req, res) {
  res.status(400).send({ messages });
});

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  if (newMessage.text && newMessage.from) {
    console.log(newMessage);
    messages.push(newMessage);
    res.status(200).send({ newMessage });
  } else res.status(204).send("Text and from fields should'nt be null");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages/:id", (req, res) => {
  const messageID = Number(req.params.id);

  const messageFound = messages.find((message) => message.id === messageID);
  if (messageFound) res.status(200).send({ messageFound });
  else res.status(400).send("no data found");
});

app.delete("/messages/:id", (req, res) => {
  const messageID = req.params.id * 1;
  const messageToDelete = messages.find((el) => el.id === messageID);
  const index = messages.indexOf(messageToDelete);
  messages.splice(index, 1);
  res.status(204).send({ status: "success" });
});
app.listen(process.env.PORT || 9090, () => {
  console.log("Messenger App is running on port " + 9090);
});
