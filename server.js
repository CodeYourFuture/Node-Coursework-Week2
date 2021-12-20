const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false })); // need this to read the payload from the form request
app.use(express.json());

// class for creating message objects which contain the text, user and ID of the message
class MessageObject {
  constructor({ text, from }) {
    // if the message array is empty (no messages sent yet) the id = 0 else it looks at the last item in the array and gets that id + 1
    this.id = messages.length === 0 ? 0 : messages[messages.length - 1].id + 1;
    this.from = from;
    this.text = text;
  }
}

// validating the parameter string has any content which isn't just whitespace
const validateMessageString = (string) => string.trim().length > 0;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [];

messages.push(
  new MessageObject({
    from: "Bart",
    text: "Welcome to the CYF chat system!",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// view all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// get one message via id
app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id); // need this to be an integer so convert it now
  const message = messages.filter((message) => message.id === id);
  // if length is 0 means the filter has found nothing and returned an empty array
  message.length === 0
    ? res.status(400).send({ message: "Message ID not found" })
    : res.send(message);
});

// edit message based on ID
app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const payload = req.body;
  const index = messages.findIndex((message) => message.id === id);

  if (index === -1)
    return res.status(400).send({ message: "Message ID not found" });

  messages[index].from = payload.from;
  messages[index].text = payload.text;

  res.send({ message: "Message has been updated" });
});

// delete a message based on ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id); // need this to be an integer so convert it now
  const index = messages.findIndex((message) => message.id === id); // gets index of the message who's ID matches the param id
  // if index === -1 findIndex couldn't find the element which means we can't delete it
  if (index === -1)
    return res.status(400).send({ message: "message ID not found" });

  messages.splice(index, 1); // remove that index
  res.send({ message: "Message successfully removed" });
});

// make a new message based on the payload / body
app.post("/messages", (req, res) => {
  const message = new MessageObject(req.body);
  const messageTextValid = validateMessageString(message.text);
  const messageFromValid = validateMessageString(message.from);

  // if message is not valid. Valid = string has any character which isn't whitespace
  if (!(messageTextValid && messageFromValid)) {
    return res
      .status(400)
      .json({ message: "message was not sent successfully" });
  }

  messages.push(message);
  res
    .status(200)
    .json({ message: "message sent successfully", newMessage: message });
});

app.listen(3001);
