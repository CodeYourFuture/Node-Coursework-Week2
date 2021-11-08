const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Add a new message to the messages
app.post("/messages", function (req, res) {
  const lastIndex = messages.length - 1;
  const lastId = messages[lastIndex].id;

  const newMessage = {
    "id" : lastId + 1,
    "from": req.body.from,
    "text": req.body.text
  }
  if(!newMessage.from || !newMessage.text) {
    res.sendStatus(400);
  } else {
    messages.push(newMessage);
    res.status(200);
  }
})

// Read all messages
app.get("/messages", function (req, res) {
  res.send(messages);
})

// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  const message = messages.filter((m) => m.id == id);
  res.send(message);
})

app.listen(port, () => {
  console.log(`The server is listening on PORT ${port}`);
});
