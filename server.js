const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
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

app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

app.get("/messages/search", (req, res) => {
  const searchQuery = req.query.text;

  const matchedMessages = messages.filter((x) =>
    x.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.status(200).json(matchedMessages);
});

app.get("/messages/latest", (req, res) => {
  if (messages.length < 10) {
    res.status(200).json(messages);
  } else if (messages.length === 0) {
    res.status(200).send("There are no messages");
  } else {
    const latestMessages = messages.slice(
      messages.length - 10,
      messages.length
    );
    res.status(200).json(latestMessages);
  }
});

app.get("/messages/:id", (req, res) => {
  // you need to check that the value of "idToFind" is actually a number, so we have to use the "Number()" method.
  const idToFind = Number(req.params.id);
  const message = messages.find((msg) => msg.id === idToFind);
  res.status(200).json(message);
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;

  if (newMessage.from === "" || newMessage.text === "") {
    res
      .status(400)
      .json({ success: false, error: "Please provide all fields" });
  } else {
    messages.push(newMessage);
    res.status(200).json({ newMessage });
  }
});

app.delete("/messages/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  console.log(idToDelete);
  console.log(typeof idToDelete);

  const indexOfMessageToDelete = messages.findIndex(
    (msg) => msg.id === idToDelete
  );
  console.log(indexOfMessageToDelete);
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
