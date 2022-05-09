const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", (req, res) => {
  res.send(messages);
});
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const newMessage = {
    id: messages.length,
    from: from,
    text,
  };
  messages.push(newMessage);
  res.send("Message sent");
});
app.delete("/messages:id", (req, res) => {
  const id = req.params.id;
  const foundMessage = messages.find((item) => item.id === Number(id));
  if (foundMessage) {
    res.json({
      message: "Message deleted",
      messages: messages.filter((item) => item.id !== Number(id)),
    });
  } else {
    res.status(404).json({ message: `Message with id: ${id} not found.` });
  }
});
const port = 3000;
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
