const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Create a new message
app.post("/messages", (req, res) => {
  let newPost = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
    timeSent: dateTime,
  };
  if (newPost.from !== "" && newPost.text !== "") {
    messages.push(newPost);
    res.json(messages);
  } else {
    res.status(400).json(`Please fill all the fields`);
  }
});

// Delete a message, by ID
app.delete("/messages/delete/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = messages.findIndex((message) => message.id === id);
  if (index) {
    messages.splice(index, 1);
    res.json(`message with id: ${id} has been deleted`);
  } else {
    res.status(404).json("Please enter a valid ID to delete");
  }
});
//Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// add support for the client to be able to update a message's text or from property.
app.put("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  let newText = req.body.text;
  let found = messages.find((message) => message.id == id);
  let updatedMsg = [];
  messages.forEach((message) => {
    if (message.id === found.id) {
      message.text = newText;
      updatedMsg.push(message);
    } else {
      updatedMsg.push(message);
    }
  });
  res.json({ updatedMsg });
});

//Read only messages whose text contains a given substring
app.get("/messages/search", (req, res) => {
  let text = req.query.text;
  if (text !== undefined) {
    let result = messages.filter((message) =>
      message.text.toLowerCase().includes(text.toLowerCase())
    );

    if (result.length < 1) {
      res.status(400).json(`Please enter a valid search term`);
    } else {
      res.json(result);
    }
  }
});

//Read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.slice(-10);
  res.json({
    message: `You are seeing ${latestMessages.length} messages`,
    latestMessages,
  });
});

///Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  let result = messages.find((message) => message.id === id);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json("There isn't any match ID");
  }
});

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + 1 + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

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

app.listen(3001, () => {
  console.log("server running...");
});
