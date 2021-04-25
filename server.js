const express = require("express");
const cors = require("cors");
const app = express();

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

/**** LEVEL 1 AND LEVEL 2 SOLUTION CODE ****/
// get all messages
app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

// get a single message, given a valid id
app.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id); // (req.params.id is a string)
  const message = messages.find((msg) => msg.id === id);

  message
    ? res.status(200).json(message)
    : res.status(404).json({ msg: "Message not found." });
});

// create a single chat message
app.use(express.json()); // restrict the received data format to JSON
app.post("/message", (req, res) => {
  const message = req.body;
  // validate chat form data
  const errors = validateChatForm(message);

  if (errors[0]) {
    // if form validation fails, respond with error message(s)
    return res.status(200).json(errors);
  }
  // otherwise...
  const newMessage = {
    // organize a the new message before posting
    id: messages.length,
    from: message.from,
    text: message.text,
  }; // set chat message id
  messages.push(newMessage); // add chat message to list (i.e. messages);
  res
    .status(201)
    // send the updated chat messages collection to the client for confirmation
    .json(messages);
});

// delete a chat message
app.delete("/message/:id", (req, res) => {
  const id = parseInt(req.params.id); // (req.params.id is a string)
  const index = messages.findIndex((msg) => msg.id === id); // check if requested chat message exists
  
  if (index !== -1) {
    // if id does,...
    messages.splice(index); // remove it from the list (i.e. messages), and
    res.sendStatus(204); // send a success status code
  }
});

// CHAT FORM VALIDATOR
function validateChatForm(chatInfo) {
  const errors = [];
  if (!chatInfo.from) {
    errors.push({ msg: "Error: Missing chat information (Name)" });
  }
  if (!chatInfo.text) {
    errors.push({ msg: "Error: Missing chat information (Message)" });
  }
  return errors;
}
/**** END OF LEVEL 1 AND LEVEL 2 SOLUTION CODE****/

app.listen(process.env.PORT || 3000);
