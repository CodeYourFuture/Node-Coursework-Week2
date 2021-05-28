const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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

app.get("/messages", function (req, res) {
  res.status(200).json(messages);
});

app.post("/messages", function (req, res) {
  const newMessage = {
    id: parseInt(new Date().getTime() / 100).toString(16),
    from: req.body.from.trim(),
    text: req.body.text.trim(),
  };
  messages.push(newMessage);
  res.status(200).json(messages);
});

app.get("/messages/:id", function (req, res) {
  const indexSelected = messages.findIndex(
    (message) => message.id == req.params.id
  );
  if (indexSelected >= 0) {
    res.status(200).json(messages[indexSelected]);
  } else {
    res.status(501).send("The message was not found");
  }
});

app.delete("/messages/:id", function (req, res) {
  const indexDelete = messages.findIndex(
    (message) => message.id == req.params.id
  );
  if (indexDelete >= 0) {
    messages.splice(indexDelete, 1);
    res.status(204).json(messages);
  } else {
    res.status(501).send("The message was not found");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
