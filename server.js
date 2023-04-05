const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let nextMessageId = 1;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  console.log(req.body);

  const newMessage = {
    id: nextMessageId++,
    from,
    text,
  };
  messages.push(newMessage);

  res.json(messages);
});

//  Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).send("Message not found");
  }
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index >= 0) {
    messages.splice(index, 1);
    res.status(204).send("Message has been deleted");
  } else {
    res.status(404).send("Message not found");
  }
});

// app.listen(process.env.PORT);

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
