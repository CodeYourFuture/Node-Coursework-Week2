const express = require("express");
const cors = require("cors");

const app = express();

let idCounter = 0;

app.use(express.json()); //<-- need this to access request body
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Show all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//filter by id
app.get("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const singleMessage = messages.filter((message) => message.id === idToFind);
  response.status(200).json(singleMessage);
});

//Search by id
app.get("/messages/search", (request, response) => {
  const text = request.query.text;

  response.json(
    messages.filter((message) => message.text.toLowerCase().includes(text))
  );
});

//Latest 10 messages
app.get("/messages/latest", (request, response) => {
  response.json(messages.slice(-10));
});

//Message with date and hour
app.post("/messages", (request, response) => {
  if (!request.body.from || !request.body.text)
    return response
      .status(400)
      .json({ message: "Please enter from and text." });

  idCounter++;

  const message = {
    id: idCounter,
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date(),
  };

  messages.push(message);
  response.json("Form submitted!");
});

//Delete message
app.delete("/messages/:id", (req, res) => {
  messages = messages.filter((message) => message.id !== +req.params.id);
  res.json({ message: "deleted message" });
});

//Listen port
app.listen(3000 || process.env.PORT, () => {
  console.log("Application listening port ...");
});
