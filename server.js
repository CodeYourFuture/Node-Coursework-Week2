const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Joanna",
  text: "Welcome to CYF chat system!",
  timeSent: 28 / 12 / 2022,
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/messages/search", (req, res) => {
  const { term } = req.query;
  console.log(term);

  const filterMessages = messages.filter((message) =>
    message.text.toLocaleLowerCase().includes(term.toLocaleLowerCase())
  );
  console.log(filterMessages);
  res.send(filterMessages);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//All messages 
app.get("/messages", (req, res) => {
  res.json(messages);
});

//Last 10 messages

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10))
})

//New message
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
  message.push(messageObject);
}
});

//Message specified by ID
app.get("/messages/:id", (req, res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));

  if (foundId) {
    res.status(200).send(foundId);
  }
});

// Delete a message by ID
app.delete("/messages/:id", (req, res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));

  if (foundId) {
    return res.status(200).json({
      msg: `Message id: ${req.params.id} deleted`,
      "All messages": messages.filter((i) => i.id !== Number(req.params.id)),
    });
  }
});

app.listen(PORT);
