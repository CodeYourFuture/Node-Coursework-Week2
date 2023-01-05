const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let idCount = 0;

app.use(express.json());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages/:id", (req, res) => {
  const search = messages.find(message => message.id === +req.params.id);
  res.json(search);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/search", (req, res) => {
  const text = req.query.text;

  res.json(messages.filter(message => message.text.toLowerCase().includes(text)));
});

app.get("/messages/latest", (req, res) => {

  res.json(messages.slice(-10));
});

app.post("/messages", (req, res) => {
  if (!req.body.from || !req.body.text) return res.status(400).json({ message: "Please enter from and text." });

  idCount++

  const message = {
    id: idCount,
    from: req.body.from,
    text: req.body.text
  };

  messages.push(message);

  res.json({ message: "success" });
});

app.delete("/messages/:id", (req, res) => {
  messages = messages.filter(message => message.id !== +req.params.id);

  res.json({ message: "success" });
});

app.listen(3000, () => { console.log("Listening on port 3000..."); });
