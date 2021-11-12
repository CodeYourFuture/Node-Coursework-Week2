const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.use(cors());

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
  {
    id: 1,
    from: "Homer",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
  {
    id: 2,
    from: "Marge",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
  {
    id: 3,
    from: "Lisa",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Create(POST) a new message using the html form
app.post("/messages", (req, res) => {
  let previousId = messages[messages.length - 1].id;
  const newMessage = {
    id: previousId + 1,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date(),
  };
  if (!newMessage.from) {
    return res.status(400).json({
      msg: "'From' input field is empty or is Invalid.",
    });
  } else if (!newMessage.text) {
    return res.status(400).json({
      msg: "'Text' input field is empty or is Invalid.",
    });
  } else {
    messages.push(newMessage);
    res.status(200).json(messages);
  }
});

// Read(GET) ALL messages with this route `/messages`
app.get("/messages", (req, res) => res.send(messages));

// Read(GET) the last ten messages using this route `/messages/latest `
app.get("/messages/latest", function (req, res) {
  const latestMessages = messages.slice(-10);
  res.json(latestMessages);
});

// Read(GET) one message specified by an ID with this route `/messages/0`
app.get("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const messageSpecified = messages.find(
    (message) => message.id === parseInt(messageId)
  );
  if (messageSpecified) {
    res.json(messageSpecified);
  } else {
    res
      .status(400)
      .json({ msg: `There is no message with the id '${messageId}'` });
  }
});

//Delete Messages with this route `/messages/0` (Not Complete)
// app.delete("/messages/:id", (req, res) => {
//   const messageId = req.params.id;
//   const findMsg = messages.find((msg) => msg.id === parseInt(messageId));

//   if (findMsg) {
//     messages = messages.filter((msg) => msg.id !== parseInt(messageId));
//     res.send(`Message Deleted with Id: ${id}`);
//   } else {
//     res.status(400).json({ msg: `There is no message with Id: ${messageId}` });
//   }
// });

//Search Messages with this route `/messages/search?text=CYF` (Not Complete)
app.get("/messages/search", (req, res) => {
  const searchText = req.query.text;
  if (searchText) {
    const searchMessages = (searchQuery) => {
      const searchQueryLowered = searchQuery.toLowerCase();
      return messages.filter((obj) =>
        obj.text.toLowerCase().includes(searchQueryLowered)
      );
    };
    res.send(searchMessages(searchText));
  } else res.send("No Messages Found With The Query");
});

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
});
