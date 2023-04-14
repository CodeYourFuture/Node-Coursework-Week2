const express = require("express");
const cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Mo Nahvi",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];
let nextMessageId = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  console.log(req.body);

  const newMessage = {
    id: nextMessageId++,
    from,
    text,
  };
  messages.push(newMessage);

  res.json({ messages });
});

app.get("/messages", (req, res) => {
  res.json({ messages });
});

app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const message = messages.find((item) => item.id === id);

  if (message) {
    res.json({ message });
  }
  res.status(404).send("Message not found!");
});

app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = messages.findIndex((item) => item.id === id);

  if (index >= 0) {
    messages.splice(index, 1);

    res.status(204).send("Message has been deleted!");
  }
  res.status(404).send("Message not found!");
});

app.listen(8000, () => {
  console.log("Server on port 8000");
});
