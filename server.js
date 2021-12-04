const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", function (request, response) {
  response.send(messages);
});
app.get("/messages/recent", function (request, response) {
  let result = messages.filter(
    (message, index) => index > messages.length - 11
  );
  response.json(result);
});

app.get("/messages/search", function (request, response) {
  const searchText = request.query.text.toLocaleLowerCase();
  let result = messages.filter((message) =>
    message.text.toLocaleLowerCase().includes(searchText)
  );
  response.json(result);
});
app.get("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const selectedMessage = messages.find(
    (message) => message.id === parseInt(messageId)
  );
  if (selectedMessage) {
    res.json(selectedMessage);
  } else {
    res
      .status(400)
      .json({ msg: `There is no message with the id '${messageId}'` });
  }
});
//Creating  new message
app.post("/messages", function (request, response) {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };

  if (!request.body.from || !request.body.text) {
    response.status(400).json("Please enter your name and message");
  } else {
    messages.push(newMessage);
    response.status(201).json(messages);
  }
});

//Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);

  const messageIndex = messages.findIndex(
    (message) => message.messageId === id
  );

  if (messageIndex >= 0) {
    messages.splice(indexOfMessage, 1);
    res.status(200).json({ Success: true });
  } else {
    res.status(404).json({ Success: false });
  }
});

app.listen(port, () => {
  console.log(`your server is listening on port ${port}`);
});
