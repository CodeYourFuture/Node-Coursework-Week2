const express = require("express");
const cors = require("cors");

const app = express();

const port = 3007;

app.use(
  cors({
    origin: "http://localhost:3007",
  })
);

const welcomeMessage = {
  id: 0,
  from: "Pakize",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// All messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// A new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;

 let newMessages = {
   id: messages.length + 1,
   from: req.body.from,
   text: req.body.text,
 };

  if (!newMessages.from || !newMessages.text) {
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
  console.log(`Server is running on port ${port}`);
});
