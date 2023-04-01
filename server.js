const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
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

const getAllMessages = (req, res) => res.status(200).json(messages);

const postMessage = (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text
  }
  messages.push(newMessage);
  res.status(200).json("Your message added!");
};

const getOneMessage = (req, res) => {
  const message = messages.find(eachMessage => eachMessage.id === Number(req.params.id));
  res.status(200).json(message);
};

const deleteMessage = (req, res) => {
  const message = messages.forEach((eachMessage, index) => {
    if (eachMessage.id === Number(req.params.id)) {
      messages.splice(index, 1);
      res.status(200).json("Your message deleted!");
    }
  })
  res.status(404).json("Your message not found!")

}

app.route("/messages")
  .get(getAllMessages)
  .post(postMessage);

app.route("/messages/:id")
  .get(getOneMessage)
  .delete(deleteMessage);

app.listen(process.env.PORT ?? 3000);