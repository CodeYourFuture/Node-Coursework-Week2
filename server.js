const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.port || 4100;

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => res.json(messages));

app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ msg: "Fill in the missing fields" });
  } else {
    messages.push(newMessage);
    res.json(messages);
  }
});

const findMessage = (id) =>
  messages.find((message) => message.id === Number(id));

app.get("/messages/:id", (req, res) => {
  if (findMessage(req.params.id)) {
    findMessage(req.params.id);
  } else {
    res
      .status(400)
      .json({ msg: `This message ${req.params.id}  does not exist` });
  }
  res.send(findMessage(req.params.id));
});

app.delete("/messages/:id", (req, res) => {
  const index = messages.indexOf(findMessage(req.params.id));
  if (findMessage(req.params.id)) {
    messages.splice(index, 1);
  } else {
    res.status(400).json({
      msg: `Could not delete. The message with id: ${req.params.id} does not exist`,
    });
  }
  res.send(messages);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
