// Install, import and execute express in app.
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5003;
const cors = require("cors");
app.use(cors());


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// GET index page at root
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});



// Messages 
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const welcomeMessage2 = {
  id: 1,
  from: "Tony",
  text: "How's it going?",
};

const welcomeMessage3 = {
  id: 2,
  from: "Betty",
  text: "Woo-Hoo!",
};

let messages = [welcomeMessage, welcomeMessage2, welcomeMessage3];



// GET all messages
app.get("/messages", function (req, res) {
  res.send(messages);
});



// GET Message by ID 
app.get("/messages/:id", (req, res) => {

  const ID = parseInt(req.params.id);

  let matchingID = messages.find((message) => message.id === ID);

  if (matchingID) {
    res.status(200).json(matchingID);
  } else {
    res
      .status(404)
      .json({ message: `No found messages with ID: ${ID}` });
  }

});




// POST new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  //If these fields are empty.. 
  if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ msg: "Name and content required" });
  }

  //push new message and send back messages in response 
  messages.push(newMessage);
  res.status(200).json(messages);
});



// DELETE a message
app.delete("/messages/:id", (req, res) => {
  const index = messages.findIndex(
    (message) => message.id === parseInt(req.params.id)
  );

  //if invalid index 
  if (index < 0) {
    res.status(404).json({ msg: `No message found at index ${req.params.id}` });
  }

  //splice required message, send back status and messages in response 
  messages.splice(parseInt(req.params.id), 1);
  res.status(200).json(messages);
});



// Read 10 most recent messages:
app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(-10));
});


// SEARCH messages 
app.get("/messages/search", (req, res) => {

  let searchTerm = req.query.text.toLowerCase();

  let filteredMgs = messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm)
  );

  if (filteredMgs.length > 0) {
    res.status(200).json(filteredMgs);
  } else {
    res
      .status(404)
      .json({ message: `No messages containing '${searchTerm}' found` });
  }

});


// Set server to listen
server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
