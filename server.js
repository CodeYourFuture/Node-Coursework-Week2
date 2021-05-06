const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
    timeSent: new Date(),
  },
  {
    id: 1,
    from: "Chris",
    text: "How are you today?",
    timeSent: new Date(),
  },
  {
    id: 2,
    from: "James",
    text: "I'm fine and doing okay?",
    timeSent: new Date(),
  },
];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = welcomeMessage;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//  Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// retrieve created the message from frontend
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages[messages.length - 1].id + 1,
    ...req.body,
    timeSent: new Date(),
  };

  // check for empty or missing text from property
  if (newMessage.from && newMessage.text) {
    messages.push(newMessage);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

// Read one message specified by an ID
app.get("/messages/:id(\\d+)?", (req, res) => {
  const findMessage = req.params.id;
  if (findMessage > 0 && findMessage < messages.length) {
    res.json(messages[findMessage]);
  } else {
    res.sendStatus(404);
  }
});

// search for messages based on inputs
app.get("/messages/search", (req, res) => {
  const searchInput = messages.filter((message) =>
    message.text.toLowerCase().includes(req.query.text.toLowerCase())
  );
  if (searchInput !== "") {
    res.json(searchInput);
  } else {
    res.send("invalid search");
  }
});

// Read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  const lastTenMessages = messages.slice(-10);
  res.json(lastTenMessages);
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const deleteMessageById = messages.findIndex((message) => message.id === parseInt(req.params.id));
  if (deleteMessageById >= 0) {
    messages.splice(deleteMessageById, 1);
    res.status(204);
  } else {
    res.status(404).json({ message: "Message Id not found" });
  }
  
});

//Check that port 4040 is not in use otherwise set it to a different port
const PORT = process.env.PORT || 4040;

//Start our server so that it listens for HTTP requests!
app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
// app.listen(process.env.PORT);

/************************************************************/
