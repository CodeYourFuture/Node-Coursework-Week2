const express = require("express");
const messageRouter = express.Router()


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];


const getAllMessages = (req, res) => res.status(200).json({ data: messages });


const postMessage = (req, res) => {
  const { from, text } = req.body;
  if (from.trim() === "") {
    return res.status(400).json("Fill from field please!");
  }
  if (text.trim() === "") {
    return res.status(400).json("Fill text field please!");
  }
  const id = messages.length !== 0 ? messages[messages.length - 1].id + 1 : 0;
  // const timestamp1 = new Date().toISOString();
  const timestamp = new Date();
  const newMessage = {
    id,
    from,
    text,
    timestamp,
  }
  messages.push(newMessage);
  res.status(200).json("Your message added!");
};


const getOneMessage = (req, res) => {
  const { id } = req.params;
  const message = messages.find(eachMessage => eachMessage.id === parseInt(id));
  if (!message) {
    return res.status(200).json("Please enter a valid Id");
  }
  res.status(200).json({ data: message });
};


const deleteMessage = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json("Enter an Id!");
  }
  const index = messages.findIndex(eachMessage =>
    eachMessage.id === id);
  if (index === -1) {
    return res.status(404).json("Your message not found!");
  }
  messages.splice(index, 1);
  res.status(200).json("Your message deleted!");
};


const getFiltered = (req, res) => {
  const text = req.query.text;
  const filtered = messages.filter(eachMessage => eachMessage.text.includes(text));
  return res.status(200).json(filtered)
}


const getLatest = (req, res) => {
  const lastIdx = messages.length - 1;
  const latestLength = 10;
  const latest = messages.filter((eachMessage, index) => index > lastIdx - latestLength);

  return res.status(200).json(latest);
}


messageRouter.route("/")
  .get(getAllMessages)
  .post(postMessage);


messageRouter.route("/search")
  .get(getFiltered);


messageRouter.route("/latest")
  .get(getLatest);


messageRouter.route("/:id")
  .get(getOneMessage)
  .delete(deleteMessage);


module.exports = messageRouter