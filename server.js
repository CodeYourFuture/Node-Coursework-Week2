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
  timeSpent: "24 / 12 / 2022",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

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
  const ourMessageObject = {
    id: messages.length + 1,
    from,
    text,
    timeSent: new Date().toLocaleDateString(),
  };

  if (from.length === 0 || text.length === 0) {
    return res.status(400).send("Please, complete body...");
  } else {
    messages.push(ourMessageObject);
  }
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
