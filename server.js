const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.use(express.json()); // before our routes definition
//level 1

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (req, res) {
  console.log("POST /messages route");
  let newChat = req.body;
  console.log(newChat, messages.length);

  //checking for an empty object but no need if checking if either fields empty
  //if (!Object.keys(newChat).length)
  if (!(req.body.from || req.body.text)) {
    res.status(400).send("All fields are required to be entered");
  } else {
    messages.push(newChat);
    res.status(200).json(messages);
  }
});

app.get("/messages", function (req, res) {
  res.status(200).send(messages);
});

app.get("/messages/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let newMessages = messages.filter((chat) => chat.id === id);
  res.status(200).send(newMessages);
});

//Read only messages whose text contains a given substring:/messages/search?text=express
app.get("/search", (req, res) => {
  let reqText = req.query.text;
  console.log(reqText);
  let newMessages = messages.filter((msg) => msg.text.includes(reqText));
  console.log("test", newMessages);
  res.status(200).send(newMessages);
});

//Read only the most recent 10 messages: /messages/latest
app.get("/latest", (req, res) => {
  console.log(messages.length);
  let latestTen = messages.filter((el, inx) => {
    if (inx >= messages.length - 10) {
      return el;
    }
  });
  res.status(200).send(latestTen);
});

let port = 3001 || process.env.PORT;
app.listen(port, () => console.log("Server is running on port " + port));
