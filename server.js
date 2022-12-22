const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const fs = require("fs");

const app = express();

let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let maxID = Math.max(...data.map((c) => c.id));

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = data;

app.post("/messages", function (req, res) {
  let userName = req.body.userName;
  let userMessage = req.body.userMessage;
  const newChat = {
    id: ++maxID,
    from: userName,
    text: userMessage,
  };
  data.push(newChat);
  save();
  res.send(data);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(data);
});

app.get("/messages/search/", function (req, res) {
  let userSearchedID = req.query.randomNumber;
  if (!Number(userSearchedID)) {
    res.send("Provide a Number, Please");
  }
  data.forEach((msg) => {
    if (msg.id === Number(userSearchedID)) {
      res.status(200).send(msg);
    }
  });
  res.status(404).send("Message Does Not Exist In The DataBase");
});

app.get("/messages/delete/", function (req, res) {
  let userSearchedID = req.query.randomNumber;
  if (!Number(userSearchedID)) {
    res.send("Provide a Number, Please");
  }
  const characterIndex = data.findIndex((c) => c.id === Number(userSearchedID));
  if (characterIndex < 0) {
    res.sendStatus(404);
    return;
  }
  data.splice(characterIndex, 1);
  save();
  res.send(data);
});

const save = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.listen(3000, function () {
  console.log("Your app is listening on port 3000 ");
});
