const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
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
  const newDate = new Date();
  newUser.date = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;

  messages.push(newUser);
  res.json(messages);
});
app.delete("/messages/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  messages = messages.filter((item) => item.id !== id);
  res.json(messages);
});
app.put("/messages/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (user && id) {
    const targetIndex = messages.findIndex((item) => item.id === id);

    messages[targetIndex].from = user.from;
    messages[targetIndex].text = user.text;
    res.status(201).send(messages);
  }
});

app.listen(PORT);
