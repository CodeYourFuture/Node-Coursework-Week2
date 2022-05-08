const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.port || 3000;

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
    id: uuid.v4(),
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ msg: "Please include a name and message" });
  } else {
    messages.push(newMessage);
    res.json(messages);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
