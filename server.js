const express = require("express");
const cors = require("cors");
const { response } = require("express");
let data = require("./data.json");
const fileStream = require("fs");
const { stringify } = require("querystring");

const app = express();

app.use(cors());
//parse URL encoded bodies
app.use(express.urlencoded({ extended: true }));
//parse JSON bodies
//app.use(express.json());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const save = () => {
  fileStream.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//send all messages

app.get("/messages", (req, res) => {
  res.json(data);
});

// Insert message

app.post("/messages", (req, res) => {
  const from = req.body.from;
  const text = req.body.text;

  //validating inputs
  if (from.match(/^ *$/) !== null && text.match(/^ *$/) !== null) 
  return;

  let maxID = Math.max(...data.map((c) => c.id));
  maxID = maxID > 0 ? maxID : 0;
  const newMessage = {
    id: ++maxID,
    from: from,
    text: text,
    timeSent: new Date()
  };
  data.push(newMessage);
  save();
  res.status(200).json(data);
});

//send specific message by id

app.get("/messages/:id", (req, res) => {
  res.status(200).json(data.filter((e) => e.id == req.params.id));
});

//delete a message by id

app.delete("/messages/:id", (req, res) => {
  data = data.filter((x) => x.id != req.params.id);
  save();
  res.status(200).json(data);
});

app.listen(3000);
