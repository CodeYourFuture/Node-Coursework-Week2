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
    console.log(typeof this.id);
    this.from = from;
    this.text = text;
  }
}

// validating the parameter string has any content which isn't just whitespace
const validateMessageString = (string) => string.trim().length > 0;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [];

messages.push(
  new MessageObject({
    id: 0,
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

// delete a message based on ID
app.delete("/messages/:id", (req, res) => {
  res.send(messages);
});

// making a new message
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
