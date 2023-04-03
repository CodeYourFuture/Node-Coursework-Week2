const express = require("express");
const app = express();
const port = 9090;
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Mohamed",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/messages/search", (req, res) => {
  const { term } = req.query;

  console.log(term);

  const filterMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(term.toLowerCase())
  );

  console.log(filterMessages);

  res.send(filterMessages);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;

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
    res.send("Messages  not found!");
  }
});

const PORT = 9090;
app.listen(PORT, function () {
  console.log("Server is listening on port 9090...");
});
