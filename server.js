const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" })); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Kavita",
  text: "Welcome to my CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3001;
app.listen(port);


app.get("/messages", (req, res) => {
  res.send(messages);
});

// Create a new message
app.post("/messages", (req, res) => {
  //let { msgName, msgText } = req.body;
  let msgName = req.body.from;
  let msgText = req.body.text;
  let idPosition = messages.length;

  const newMsg = {
    id: idPosition,
    name: msgName,
    message: msgText,
  };

  if (!newMsg.name || !newMsg.message) {
    return res.status(400).json("Please include a name and 1 message");
  } else {
    messages.push(newMsg);
    res.status(200).json(messages);
  }
});

app.get("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let filterMsg = messages.filter(msg => msg.id === id);

  res.send(filterMsg);
});

app.delete("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let filterMsg = messages.filter((msg) => msg.id === id);

  messages = messages.filter(msg => msg.id !== id);

  res.send(filterMsg);
});

app.get("/search", (req, res) =>
{
  let textSearch = req.query.text;
  let filterMsg = messages.filter(msg => msg.text.includes(textSearch));

  res.send(filterMsg);
});


app.get("/latest", (req, res) =>
{
  let filterMsgs = messages.filter(msg => parseInt(msg.id) > (messages.length - 11));

  res.send(filterMsgs);
});

