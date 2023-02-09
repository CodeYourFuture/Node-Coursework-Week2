const express = require("express");
const PORT = 3000;
const app = express();
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/messages", function (req, res) {
  res.send(messages);
});

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  messages.push(newMessage);
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const findMessageId = req.params.id;
  const message = messages.find((message) => message.id === findMessageId);

  if (!message) {
    res.status(404).send("message not found.");
    return;
  } else {
    res.send(message);
  }
});

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});
