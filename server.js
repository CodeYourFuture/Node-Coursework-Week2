const express = require("express");
const cors = require("cors");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 3003;
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: "",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// returining all messages
app.get("/messages", (req, res) => {
  const queryText = req.query.text;
  messages.forEach((message) => console.log(message.text.includes(queryText)));

  // console.log(messages.filter((message) => message.text.includes(queryText)));
  if (queryText) {
    return res.json(
      messages.filter((message) =>
        message.text.toLowerCase().includes(queryText.toLowerCase())
      )
    );
  }

  res.json(messages).send;
});

// return the result of the latest 10 messages
app.get("/messages/latest", (req, res) => {
  const latestTenMessages = -10;
  res.json(messages.slice(latestTenMessages));
});

// return message with specific id
app.get("/messages/:id", (req, res) => {
  console.log("latest");
  const id = req.params.id;
  res.json(messages.filter((message) => message.id === parseInt(id)));
});

//create new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
    timeSent: Date.now(),
  };

  if (!newMessage.from && !newMessage.text) {
    return res.status(400).send("Please fill name and message fields");
  } else if (!newMessage.from) {
    return res.status(400).send("Please fill the name");
  } else if (!newMessage.text) {
    return res.status(400).send("Please fill the text");
  }

  var m = new Date();
  var dateString =
    m.getFullYear() +
    "/" +
    ("0" + (m.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getDate()).slice(-2) +
    " " +
    ("0" + m.getHours()).slice(-2) +
    ":" +
    ("0" + m.getMinutes()).slice(-2) +
    ":" +
    ("0" + m.getSeconds()).slice(-2);

  newMessage.timeSent = dateString;
  messages.push(newMessage);
  res.send(messages);
});

// delete a message
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = messages.map((message) => message.id).indexOf(id);
  if (index > -1) {
    messages.splice(index, 1);
  }
  res.json(messages);
});

app.listen(PORT, console.log(`Node server started on port ${PORT}`));
