const express = require('express');
const router =  express.Router();

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

// //This array is our "data store".
// //We will start with one message in the array.
// //Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// // Add a new message to the messages
router.post("/", function (req, res) {
  const lastIndex = messages.length - 1;
  const lastId = messages[lastIndex].id;
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  const newMessage = {
    "id" : lastId + 1,
    "from": req.body.from,
    "text": req.body.text,
    "timeSent": dateTime
  };

  if(!newMessage.from || !newMessage.text) {
    res.sendStatus(400);
  } else {
    messages.push(newMessage);
    res.status(200);
  }
})

// // Read all messages
router.get("/", function (req, res) {
  res.send(messages);
})

// // Read messages whose text contains a given substring: `/messages/search?text=express`
router.get('/search', function (req, res) {
  const searchText = req.query.text;
  const foundMessages = messages.filter((msg) => msg.text.includes(searchText));
  res.send(foundMessages);
})

// // Read only the most recent 10 messages: `/messages/latest`
router.get('/latest', function (req, res) {
  const latestTenMessages = messages.slice(-10)
  res.send(latestTenMessages);
})

// // Read one message specified by an ID
router.get("/:id", function (req, res) {
  const id = req.params.id;
  const message = messages.filter((m) => m.id == id);
  res.send(message);
})

// // Update text or from property
router.put('/update/:id', function (req, res) {
    const found = messages.some(({id}) => id === parseInt(req.params.id));
    if(found) {
        const updMessage = req.body;
        messages.forEach((msg) => {
            if(msg.id === parseInt(req.params.id)) {
                msg.from = updMessage.from;
                msg.text = updMessage.text;
            }
            res.send("The message is updated", msg);
        })
    }else {
        res.status(400).send({ "msg": `No message with the id of ${req.params.id}`})
    }
})

module.exports = router;