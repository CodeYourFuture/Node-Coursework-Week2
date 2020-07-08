const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const message = require("./message");
const moment = require("moment");

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const txtMessages = message;

app.get("/messages", (req, res) => {
  res.send(txtMessages);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  if (req.body.id === "" || req.body.from === "" || req.body.text === "") {
    res.status(400).send("Input field can't empty ");
  } else {
    const newMessage = {
      ...req.body,
      time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    };

    txtMessages.push(newMessage);

    res.send({ message: "message send" });
  }
});
app.get("/messages/search", (req, res) => {
  const searchWord = req.query.word.toLowerCase();

  const searchMessageArr = txtMessages.filter((message) =>
    message.text.toLowerCase().includes(searchWord)
  );

  res.send(searchMessageArr);
});
app.get("/messages/latest", (req, res) => {
  const latestMessage = txtMessages.slice(
    txtMessages.length - 10,
    txtMessages.length
  );
  res.send(latestMessage);
});

app.get("/messages/:id", (req, res) => {
  const reqMessageId = req.params.id;
  if (reqMessageId === txtMessages.id) {
    const newMessageArr = txtMessages.filter(
      (message) => message.id === reqMessageId
    );
    res.send(newMessageArr);
  } else {
    res.status(400).send("Not valid id ");
  }
});

app.delete("/delete/:id", (req, res) => {
  const delMessageId = req.params.id;
  const newMessageArr = txtMessages.filter(
    (message) => message.id !== delMessageId
  );
  res.send(newMessageArr);
});

let port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Listening on port ${port}`));
