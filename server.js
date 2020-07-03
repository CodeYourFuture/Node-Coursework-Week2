const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dataMessages = require("./messages.json");
const app = express();
app.use(cors());
app.use(bodyparser());

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: __dirname });
});

let messages = dataMessages;

app.post("/messages", (req, res) => {
  console.log(req.body);
  if (req.body.from !== "" && req.body.text !== "") {
    messages.push(req.body);
    res.json({ success: true });
  } else {
    res.status(400).send("Message cannot be sent with empty form ! ");
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});
app.get("/messages/search/", (req, res) => {
  const searchMessage = req.query.text;
  const filteredMessage = messages.filter((message) =>
    message.text.toLowerCase().includes(searchMessage.toLowerCase())
  );
  res.send(filteredMessage);
});
app.get("/messages/latest", (req, res) => {
  const latestMessages = messages.slice(messages.length - 10, messages.length);
  res.send(latestMessages);
});
app.get("/messages/:id", (req, res) => {
  if (req.params.id) {
    const selectedMessage = messages.find(
      (message) => message.id === Number(req.params.id)
    );
    res.send(selectedMessage);
  } else {
    res.sendStatus(404);
  }
});
//    "3"   !=  3
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const filteredMessages = messages.filter((message) => {
    console.log(typeof message.id, message.id, typeof Number(id), Number(id));

    return message.id !== Number(id);
  });
  if (filteredMessages.length !== messages.length) {
    messages = filteredMessages;
    res.send(messages);
  } else {
    res.sendStatus(404);
  }
});

const myPort = process.env.PORT || 3001;
app.listen(myPort, () => {
  console.log(`Listening on port ${myPort}`);
});
