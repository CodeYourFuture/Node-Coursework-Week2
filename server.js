const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  name: "Marina",
  message: "Welcome to my chat!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.send("GET it's working, Go to /messages to see all messages");
});

// Read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// Create a new message
app.post("/messages", (req, res) => {
  const { name, message } = req.body;

  const newMessages = {
    id: messages.length,
    name,
    message,
  };

  if (!newMessages.name || !newMessages.message) {
    return res.status(400).json("Please include a name and message");
  }

  messages.push(newMessages);

  res.send(messages);
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));

  if (foundId) {
    res.status(200).send(foundId);
  }
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));

  if (foundId) {
    return res.status(200).json({
      msg: `Message id: ${req.params.id} deleted `,
      "All messages: ": messages.filter((i) => i.id !== Number(req.params.id)),
    });
  }
});

app.listen(port, () => {
  console.log(`Listen in http://localhost:${port}`);
});
