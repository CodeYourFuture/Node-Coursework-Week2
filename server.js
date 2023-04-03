const express = require("express");
const cors = require("cors");
const { response } = require("express");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const welcomeMessage = {
  id: 0,
  from: "Zahraa",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
  response.send("You are now live");
});

//CREATE message and POST it
app.post("/messages", (req, res) => {
  let newMessage = req.body;

  if (!newMessage.from || !newMessage.text) {
    res
      .status(400)
      .json({ success: false, error: "Please provide all fields" });
  } else {
    let newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
      time: new Date().toLocaleString(),
    };
    messages.push(newMessage);
    res.status(200).json({ newMessage });
  }
});

//GET all messages
app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

//GET message specified by search query
app.get("/messages/search", (req, res) => {
  const searchQuery = req.query.text;

  const matchedMessages = messages.filter((x) =>
    x.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.status(200).json(matchedMessages);
});

//GET latest 10 messages
app.get("/messages/latest", (req, res) => {
  if (messages.length === 0) {
    res.status(200).send(error, "There are no messages");
  } else if (messages.length < 10) {
    res.status(200).json(messages);
  } else {
    const latestMessages = messages.slice(
      messages.length - 10,
      messages.length
    );
    res.status(200).json(latestMessages);
  }
});

//GET message specified by ID
app.get("/messages/:id", (req, res) => {
  // you need to check that the value of "idToFind" is actually a number, so we have to use the "Number()" method:
  const idToFind = Number(req.params.id);
  const message = messages.find((msg) => msg.id === idToFind);
  res.status(200).json(message);
});

//UPDATE message by specified ID
app.put("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const messageToUpdate = messages.find((msg) => msg.id === messageId);
  const indexOfMessageToUpdate = messages.indexOf(messageToUpdate);

  let updatedMessage = {
    id: messageId,
    from: req.body.from,
    text: req.body.text,
    time: messageToUpdate.time,
  };

  if (indexOfMessageToUpdate === -1) {
    res
      .status(404)
      .json({ success: false, error: "No message with that ID was found" });
  } else if (indexOfMessageToUpdate === 0) {
    res
      .status(404)
      .json({ success: false, error: "You cannot edit this message" });
  } else {
    messages.splice(indexOfMessageToUpdate, 1, updatedMessage);
  }

  res.status(200).json({ success: true, updatedMessage });
});

//DELETE message specified by ID
app.delete("/messages/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  const indexOfMessageToDelete = messages.findIndex(
    (msg) => msg.id === idToDelete
  );

  if (indexOfMessageToDelete === -1) {
    res
      .status(404)
      .json({ success: false, error: "No message with that ID was found" });
  } else {
    messages.splice(indexOfMessageToDelete);
    res.status(200).json({ success: true });
  }
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
