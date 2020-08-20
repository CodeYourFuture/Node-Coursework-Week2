const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Create a new message
app.post("/messages", (req, res) => {
  let newPost = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };
  if (newPost.from !== "" && newPost.text !== "") {
    messages.push(newPost);
    res.json(messages);
  } else {
    res.status(400).json("Please Fill All The Fields");
  }
});

//Read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//Read only messages whose text contains a given substring: /messages/search?text=express
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

//Read only the most recent 10 messages: /messages/latest
app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.slice(-10);
  res.json(latestMessages);
});

//Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  let result = messages.find((item) => item.id === id);
  res.json(result);
});

//Delete a message, by ID
app.delete("/messages/delete/:id", (req, res) => {
  let id = Number(req.params.id);
  let index = messages.findIndex((item) => item.id === id);
  if (index) {
    messages.splice(index, 1);
    res.json(`message with id ${id} has been deleted`);
  } else {
    res.status(404).json("Please Enter A Valid Id");
  }
});

app.listen(process.env.PORT);
