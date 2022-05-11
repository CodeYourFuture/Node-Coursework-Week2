const express = require("express");
const data = require("./data.json");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [];

app.get("/", function (request, response) {
  response.send(messages);
});

app.post("/messages", (req, res) => {
  const newUser = req.body;
  messages.push(newUser);
  res.json(messages);
});
app.delete("/messages/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  messages = messages.filter((item) => item.id !== id);
  res.json(messages);
});

app.listen(process.env.PORT);
