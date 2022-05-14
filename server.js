const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

//[3] read one message specified by id
app.get("/messages/:id", function (req, res) {
  const { id } = req.params;
  const messageToReturn = messages.filter(
    (message) => message.id === Number(id)
  );
  if (messageToReturn) {
    //console.log(messageToReturn)
    res.json(messageToReturn);
  } else {
    res.status(404).json("sorry id does not exist");
  }
});

//const from = req.body.from
// const text = req.body.text

//[2] read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// [1] create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  // console.log(req.body)
  const ourMessage = {
    id: messages.length,
    from,
    text,
  };
  messages.push(ourMessage);
});

//[4] delete a message by id
app.delete("/message/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id !== Number(id));
  res.json(messages);
});

// app.get("/", function (req, res) {
//   res.send("you found me");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running!");
});
