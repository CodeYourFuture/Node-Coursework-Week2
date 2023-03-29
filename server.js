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
//create message
app.post("/messages", (req, res) => {
  if (
    !req.body.from ||
    !req.body.text ||
    req.body.text === "" ||
    req.body.from === ""
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
  const message = messages.find(
    (message) => message.id === Number(req.params.id)
  );
  messages.splice(message, 1);
  res.status(204).send("delete");
});
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
