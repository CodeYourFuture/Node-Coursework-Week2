const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

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
app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.filter(
    (message, index) => messages.length - 10 < index
  );
  res.send(latestMessages);
});

app.get("/messages", (req, res) => {
  res.send(messages);
});
app.get("/messages/:id", (req, res) => {
  const findMessage = messages.find((mes) => mes.id === Number(req.params.id));

  if (findMessage) res.send(findMessage);
  res.status(404).send("Message not found");
});
app.post("/messages", (req, res) => {
  if (req.body.from.length === 0 || req.body.text.length === 0)
    res.status(400).send("No empty messages");
  messages.push({
    id: messages.length,
    ...req.body,
  });
  console.log(req.body);
  res.sendFile(__dirname + "/index.html");
});
app.delete("/messages/:id", (req, res) => {
  const indexMessage = messages.findIndex(
    (mes) => mes.id === Number(req.params.id)
  );
  let x = messages.splice(indexMessage, 1);
  res.send("Message deleted");
});

app.get("/messages/search/:id", (req, res) => {
  console.log(req.query);
  const filteredMessages = messages.filter((message) =>
    message.text.includes(req.query.text)
  );
  res.send(filteredMessages);
});

app.listen(3000);
