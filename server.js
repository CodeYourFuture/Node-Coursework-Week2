const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  timeSent: "15:10/1-1-2023",
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
  console.log("keyword:", keyword);
  if (keyword) {
    const matched = messages.filter((message) => message.text.toLowerCase().includes(keyword.toLowerCase()));
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
    msg.id = messages.length;
    msg.timeSent = getDateTime();
    messages.push(msg);
    console.log(messages);
  }
});

app.put("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  const msg = req.body;

  const valid = (msg.hasOwnProperty("text") && !!msg.text) || (msg.hasOwnProperty("from") && !!msg.from);
  if (!valid) {
    res.status(400).send("missing information");
  } else {
    messages.map((message) => {
      if (message.id + "" === msgId) {
        return (message.from = msg["from"]);
      }
    });
    console.log(messages);
  }
});

app.delete("/messages/:id", (req, res) => {
  const msgId = +req.params.id;
  messages = messages.filter((message) => message.id !== msgId);
  console.log(messages);
});

app.listen(5001 || process.env.PORT);

const getDateTime = () => {
  const date = new Date();

  let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${time}/${day}-${month}-${year}`;
};
