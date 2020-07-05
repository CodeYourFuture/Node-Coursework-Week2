const express = require("express");
const body = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(body.json());
app.use(express.urlencoded({ extended: false }));

let MessageId = 0;

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  const msg = messages.filter((m) => Number(m.id) === Number(msgId));
  res.send(msg);
});

app.post("/messages", (req, res) => {
  req.body.from === "" || req.body.text === ""
    ? res.send("Please fill out From & Text filed").sendStatus(400)
    : messages.push({
        id: (MessageId += 1),
        from: req.body.from,
        text: req.body.text,
      });
  res.send({ insertResult: true });
});

app.delete("/messages/:id", (req, res) => {
  const msgId = Number(req.params.id);
  messages = messages.filter((m) => Number(m.id) !== Number(msgId));
  res.send({ deleteResult: true });
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.listen(process.env.PORT || 5000, () =>
  console.log("server has started ...")
);
