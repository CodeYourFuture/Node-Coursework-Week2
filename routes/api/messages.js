const express = require('express');
const router = express.Router();
const _ = require("lodash");


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = require('../../Messages');

// Check if ID exisits in Array
const someId = msgId => messages.some(message => message.id === parseInt(msgId));

// Return the Message with ID
const findId = msgId => messages.find(message => message.id === parseInt(msgId));

// Remove Message with ID
const filterId = msgId => messages.filter(message => message.id !== parseInt(msgId));

const mostRecent = messages.slice(-1);
console.log('mostRecent=', mostRecent);

// Get All Messages
router.get("/", (req, res) => {
  res.json(messages)
});

// Get Most Recent 10 Messages
// router.get('/messages/latest', (req, res) => {
  // res.json(mostRecent);
// })

// Search only messages which text contains a given substring.
router.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  let wordMatch = messages.filter(({ text }) => {
    return (
      text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });

  if (wordMatch) {
    res.json(wordMatch);
  } else {
    res.status(404).json({ msg: `No message that contains the word ${searchTerm}` });
  }
});

// Get a Message by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const matchId = someId(id);

  if (matchId) {
    const idFound = findId(parseInt(id));
    res.json(idFound);
  } else {
    res.status(404).json({ msg: `No message with the ID of ${id}` });
  }
});

// Create a New Message
router.post("/", (req, res) => {
  const newMessage = {
    id: parseInt(_.uniqueId()),
    from: req.body.from,
    text: req.body.text
  };

  if (!newMessage.from) {
    res.status(400).json({ msg: `Please include a name` }); //  Check if a name is included
  } else if (!newMessage.text) {
    res.status(400).json({ msg: `Please include a message` });  //  Check if message is included
  } else {
    messages.push(newMessage);
    res.json(messages);
  }
});

// Delete a Message by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteId = someId(id);

  if (deleteId) {
    const deleteMsg = filterId(id);
    res.status(200).send({ success: true, msg: `Deleted message with the ID of ${id}` }).json(deleteMsg);
  } else {
    res.status(404).json({ msg: `No message with the ID of ${id}` });
  }
});

module.exports = router;