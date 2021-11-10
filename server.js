//Anza Azam NW4 CYF Chat Server
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const uuid = require("uuid4");

const welcomeMessage = {
  id: uuid(),
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
console.log(messages);

//different routes //html form
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
// get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});
//search message text containing a particular word
app.get("/messages/search", (req, res) => {
  const searchingWord = req.query.text.toLowerCase();
  const searchResults = messages.filter(({ text }) =>
    text.toLowerCase().includes(searchingWord)
  );
  res.json({ "searched Message": searchResults });
});
//get latest 10 messages
app.get("/messages/latest", (req, res) => {
  const messaging = [...messages];
  res.json(messaging.slice(messaging.length - 10, messaging.length));
});
//post a message from form
app.post("/messages", (req, res) => {
  const newmsg = {
    id: uuid(),
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date(),
  };

  if (req.body.from && req.body.text) {
    messages.push(newmsg);
  } else {
    res.sendStatus(400);
  }
  res.json({ msg: "New Message Added", message: messages });
});
//get message having particular id
app.get("/messages/:id", (req, res) => {
  res.json({
    msg: "message retrieved",
    messages: messages.filter(({ id }) => id === req.params.id),
  });
});
//update message with particular id
app.put("/messages/:id", (req, res) => {
  let updatedMessage = messages.filter(
    (message) => message.id === req.params.id
  );
  const newmsg = updatedMessage.map((message) => {
    message.from = req.body.from;
    message.text = req.body.text;
    message.timeSent = new Date();
  });
  res.json(messages);
});
//delete message with particular id
app.delete("/messages/:id", (req, res) => {
  let indexsearched = 0;
  let messageDeleted = messages.filter((messages, index) => {
    if (messages.id === req.params.id) {
      indexsearched = index;
    }
  });

  if (indexsearched > -1) {
    let newarray = messages.splice(indexsearched, 1);
    res.json(messages);
  }
});

app.listen(process.env.PORT);
