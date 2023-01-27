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
  from: "Oguzhan",
  text: "Welcome to CYF chat system!",
  timeSpent: "27 / 01 / 2023",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

//Read only text whose text contains a given substring

app.get("/messages/search", (req, res) => {
  const { term } = req.query;
  console.log(term);

  const filterMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(term.toLowerCase())
  );
  console.log(filterMessages);
  res.send(filterMessages);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// All messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//  Read only the last 10 messages:

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});

// A new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  // console.log(req.body)
  const messageObject = {
    id: messages.length + 1,
    from,
    text,
    timeSent: new Date().toLocaleDateString(),
  };

  if (from.length === 0 || text.length === 0) {
    return res.status(400).send("Please, complete body...");
  } else {
    res.json(messageObject);
  }
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id === Number(id));
  res.status(200).json(messages);
});

app.get("/messages/search", (req, res) => {
  let search = req.query.term;
  let searchResult = messages.filter((msg) =>
    msg.text.toLowerCase().includes(search.toLowerCase())
  );
  res.send(searchResult);
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((msg) => msg.id !== Number(id));
  res.send("Message deleted!");
});

app.put("/messages/:id", (req, res) => {
  const id = req.params.id;
  let msg = messages.filter((message) => message.id === Number(id));
  if (msg.length > 0) {
    msg.from = req.body.from;
    msg.text = req.body.text;
    res.send(msg);
  } else {
    res.send("Messages are not found!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
