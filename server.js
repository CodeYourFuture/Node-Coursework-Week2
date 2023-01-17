const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let idCount = 1;

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


//  Create a new message
app.use(express.json());

app.post("/messages", function (req, res) {
  const newMsg = req.body;
  console.log(req);
  
  // Level 2 - simple validation
  const msg = {
    id: idCount++,
    from: req.body.from,
    text: req.body.text,
  };
  if (!newMsg.from || !newMsg.text) {
    res.status(400).send("Rejected: empty or missing text or from property.");
  } else {
    messages.push(msg);
    // res.status(201).send(`Request accepted`);
    res.redirect("/");
  }
});


//  Read all messages
app.get("/messages", function (req, res) {
  res.status(200).send({ messages });
});


// Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", function (req, res) {
  if (messages.length <= 10) {
    res.status(200).send({ messages });
  } else {
    const latest10 = messages.slice(-10);
    res.status(200).send({ latest10 });
  }
});


// Read only messages whose text contains a given substring: /messages/search?text=express
app.get("/messages/search", function (req, res) {
  const searchWord = req.query.text;
  const result = search(searchWord);
  res.json(result);
});

//search by a term
function search(word) {
  return messages.filter(
    (msg) => msg.text.toLowerCase().includes(word.toLowerCase())
  );
}


//  Read one message specified by an ID
app.get("/messages/:msgId", function (req, res) {
  const idToFind = Number(req.params.msgId);
  const msg = messages.find((msg) => msg.id === idToFind);
  res.status(200).send({ msg });
});


//  Delete a message, by ID
app.delete("/messages/:msgId", function (req, res) {
  const idToDel = Number(req.params.msgId);
  const indexToDel = messages.findIndex((msg) => msg.id === idToDel);
  if (indexToDel >= 0) {
    messages.splice(indexToDel, 1);
  }
  res.status(200).send({ messages });
});


app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000...");
});
