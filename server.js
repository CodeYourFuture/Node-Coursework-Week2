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
let messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/search", (req, res) => {
  const keyword = req.query.text;
  if (keyword) {
    const matched = messages.filter((message) => message.text.includes(keyword));
    res.send(matched);
  }
});

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});

app.get("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  const matched = messages.find((massage) => massage.id + "" === msgId);
  res.send(matched);
});

app.post("/messages", (req, res) => {
  const msg = req.body;

  const valid = !!msg.text && !!msg.from && msg.hasOwnProperty("text") && msg.hasOwnProperty("from");
  if (!valid) {
    res.status(400).send("missing information");
  } else {
    messages.push(msg);
    console.log(messages);
  }
});

app.delete("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  messages = messages.filter((message) => message.id + "" !== msgId);
  // res.send(messages);
  console.log(messages);
});

app.listen(5001 || process.env.PORT);
