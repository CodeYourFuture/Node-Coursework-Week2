const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const getAllMessages = (req, res) => res.status(200).json({ data: messages });

const postMessage = (req, res) => {
  const { from, text } = req.body;

  from.trim() === "" ? res.status(200).json("Fill from field please!") : null;
  text.trim() === "" ? res.status(200).json("Fill text field please!") : null;
  const newId = messages.length !== 0 ? messages[messages.length - 1].id + 1 : 0;
  const newMessage = {
    id: newId,
    from: from,
    text: text
  }
  messages.push(newMessage);
  res.status(200).json("Your message added!");
};

const getOneMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(eachMessage => eachMessage.id === Number(id));
  !message ? res.status(200).json("Please enter a valid Id") :
    res.status(200).json({ data: message });
};

const deleteMessage = (req, res) => {
  const index = messages.findIndex(eachMessage =>
    eachMessage.id === Number(req.params.id));
  index === -1 ? res.status(404).json("Your message not found!") : messages.splice(index, 1) && res.status(200).json("Your message deleted!");
};

app.route("/messages")
  .get(getAllMessages)
  .post(postMessage);

app.route("/messages/:id")
  .get(getOneMessage)
  .delete(deleteMessage);

app.listen(process.env.PORT ?? 4000);