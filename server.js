// Install, import and execute express in app.
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5003;
const cors = require("cors");
app.use(cors());

// Set server to listen
server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET index page at root
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];

// GET all messages
app.get("/messages", function (req, res) {
  res.send(messages);
});

// GET by ID
app.get("/messages/:id", (req, res) => {
  const filteredMsg = messages.filter(
    (message) => message.id == parseInt(req.params.id)
  );

  if (filteredMsg.length > 0) {
    res.status(200).json(filteredMsg);
  } else {
    res
      .status(400)
      .send({ msg: `No message matching: ${req.params.id} has been found` });
  }
});

// POST new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ msg: "Name and content required" });
  }

  messages.push(newMessage);
  res.status(200).json(messages);
});

// DELETE a message
app.delete("/messages/:id", (req, res) => {
  const index = messages.findIndex(
    (message) => message.id === parseInt(req.params.id)
  );

  if (index < 0) {
    res.status(404).json({ msg: `No message found at index ${req.params.id}` });
  }

  messages.splice(parseInt(req.params.id), 1);
  res.status(200).json(messages);
});
