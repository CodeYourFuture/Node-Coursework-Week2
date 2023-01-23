const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9090;

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

app.get("/messages/latest", (req, res) => {
  const latestMessages = messages.slice(-10);
  if (latestMessages) res.status(200).send(latestMessages);
  else res.status(400).send({ error: "no data found" });
});

app.get("/messages/search", (req, res) => {
  const searchTerm = req.query.term;
  const searchResult = messages.filter(({ text }) => text.includes(searchTerm));

  if (searchResult.length) res.status(200).send({ searchResult });
  else res.status(400).send({ error: "no data found" });
});

app.get("/messages/:id", (req, res) => {
  const messageID = Number(req.params.id);

  const messageFound = messages.find((message) => message.id === messageID);
  if (messageFound) res.status(200).send(messageFound);
  else res.status(400).send({ error: "no data found" });
});

app.get("/messages", function (req, res) {
  res.status(400).send({ messages });
});

app.post("/messages", function (req, res) {
  let newMessage = req.body;
  if (newMessage.text && newMessage.from) {
    const timeSent = new Date();
    maxId = Math.max(...messages.map(({ id }) => id * 1));
    newMessage = { ...newMessage, id: maxId + 1, timeSent: timeSent };
    messages.push(newMessage);
    res.status(200).send({ success: newMessage });
  } else res.status(204).send({ error: "Text and from fields should'nt be null" });
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.delete("/messages/:id", (req, res) => {
  const messageID = parseInt(req.params.id); //convert the ID it to number
  const messageIndex = messages.findIndex((el) => el.id === messageID);

  if (messageIndex === -1) return res.status(204).send();

  messages.splice(messageIndex, 1);

  res.status(200).send({ status: "message deleted successfully" });
});

app.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { from, text } = req.body;

  const messageIndex = messages.findIndex(
    (message) => message.id === parseInt(id)
  );

  if (messageIndex === -1)
    return res.status(404).send({ error: "message not found" });

  messages[messageIndex].from = from;
  messages[messageIndex].text = text;

  return res.status(200).send(messages[messageIndex]);
});

app.listen(port, () => {
  console.log("Messenger App is running on port " + 9090);
});
