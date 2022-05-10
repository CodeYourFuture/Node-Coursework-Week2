const express = require("express");
const router = express.Router();
const messagesData = require("../data");

router.get("/", function (request, response) {
  response.json(messagesData);
});

router.get("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let filteredMessage = messagesData.find((el) => el.id === id);
  if (!filteredMessage) {
    res.status(400).send("User not found for given id");
  }
  response.json(filteredMessage);
});

router.post("/", function (request, response) {
  let newMessage = {
    id: messagesData[messagesData.length - 1].id + 1,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).send("Message not found for given id");
  }
  messagesData.push(newMessage);
  response.json(messagesData);
});

router.delete("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let filteredMessage = messagesData.filter((el) => el.id !== id);
  if (!filteredMessage) {
    res.status(400).send("User not existing given id");
  }
  response.json(filteredMessage);
});

module.exports = router;
