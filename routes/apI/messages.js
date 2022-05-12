const express = require("express");
const router = express.Router();

const messages = require("../../Messages");

const uuid = require("uuid");

// router.get("/", (request, response) => {
//   response.sendFile(__dirname + "../../index.html");
// });

//Get all messages
router.get("/", (req, res) => {
  res.json(messages);
});

//Get messages that includes search words
router.get("/search", (req, res) => {
  res.json(messages.filter((message) => message.text.includes(req.query.text)));
});

//Get last 10 messages
router.get("/latest", (req, res) => {
  res.json(messages.slice(-10));
});

//Get one message with a specific Id
router.get("/:messageId", (req, res) => {
  const requestedId = parseInt(req.params.messageId);
  const found = messages.some(
    (message) => message.id === parseInt(requestedId)
  );
  if (found) {
    res.json(
      messages.filter((message) => message.id === parseInt(requestedId))
    );
  } else {
    res.status(404).json({ msg: `there is no message with id ${requestedId}` });
  }
});

//Create a new message

router.post("/", (req, res) => {
  const { from, text } = req.body;

  if (!from || !text) {
    const helpfulMessage = `you should enter ${!from ? "from" : "text"}`;
    return res.status(404).json({ msg: helpfulMessage });
  }
  const newMessage = {
    id: uuid.v4(),
    from,
    text,
  };
  messages.push(newMessage);
  res.json(messages);
});

//Delete a message
router.delete("/:messageId", (req, res) => {
  const requestedId = parseInt(req.params.messageId);
  const found = messages.some(
    (message) => message.id === parseInt(requestedId)
  );
  if (found) {
    res.json({
      msg: `message with id ${requestedId} is deleted`,
      messages: messages.filter(
        (message) => message.id !== parseInt(requestedId)
      ),
    });
  } else {
    res.status(404).json({ msg: `there is no message with id ${requestedId}` });
  }
});
module.exports = router;
