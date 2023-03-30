const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // need this to access req.body

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

//Read _only_ messages whose text contains a given substring
app.get("/messages/search", (req, res) => {
  const { text } = req.query;
  if (!text || text.trim() === "") {
    res.status(400).send("error");
  } else {
    const searchedMessage = messages.filter((message) =>
      message.text.toLowerCase().includes(text.toLowerCase())
    );
    console.log(searchedMessage);
    res.send({ searchedMessage });
  }
});

//Read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  const latestMessages = messages.slice(-10);
  res.send(latestMessages);
});

//create message
app.post("/messages", (req, res) => {
  if (
    !req.body.from ||
    !req.body.text ||
    req.body.text.trim() === "" ||
    req.body.from.trim() === ""
  ) {
    res.status(400).send("write a correct text and from");
  } else {
    const newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
    };
    messages.push(newMessage);
    res.status(201).send(newMessage);
  }
});

//read all message
app.get("/messages", (req, res) => {
  res.send({ messages });
});
//read one message
app.get("/messages/:id", (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id)
  );

  res.status(200).send({ message });
});
//delete message
app.delete("/messages/:id", (req, res) => {
  const filteredMessages = messages.filter(
    (message) => message.id !== Number(req.params.id)
  );
});
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(9090, () => {
  console.log("Server started on port 8081");
});
