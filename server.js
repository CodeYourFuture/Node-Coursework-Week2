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
    this.timeSent = new Date(); // including a time sent for all the messages
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
  res.json(messages);
});

// serve the latest x messages based on the query
app.get("/messages/latest", (req, res) => {
  const amount = req.query.amount || 10; // if the query doesn't exist load the latest 10 messages
  const latestMessages = messages.slice(0, parseInt(amount) + 1); // get the first 10 messages from the array
  res.json(latestMessages);
});

// search for messages based on a query string
app.get("/messages/search", (req, res) => {
  const textQuery = req.query.text;
  const fromQuery = req.query.from;

  if (textQuery === undefined && fromQuery === undefined)
    return res
      .status(400)
      .json({ message: "Please enter a Query for either 'text' or 'from'" });

  const convertToLowerCase = (string) =>
    string === undefined ? null : string.toLowerCase();

  // looks real bad but works.
  const filteredMessages = messages.filter((message) => {
    if (textQuery && fromQuery)
      return (
        message.text.toLowerCase().includes(convertToLowerCase(textQuery)) &&
        message.from.toLowerCase().includes(convertToLowerCase(fromQuery))
      );
    else
      return (
        message.text.toLowerCase().includes(convertToLowerCase(textQuery)) ||
        message.from.toLowerCase().includes(convertToLowerCase(fromQuery))
      );
  });
  res.json(filteredMessages);
});

// get one message via id
app.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id); // need this to be an integer so convert it now
  const message = messages.filter((message) => message.id === id);
  // if length is 0 means the filter has found nothing and returned an empty array
  message.length === 0
    ? res.status(400).send({ message: "Message ID not found" })
    : res.json(message);
});

// edit message based on ID
app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const payload = req.body;
  const index = messages.findIndex((message) => message.id === id);

  if (index === -1)
    return res.status(400).json({ message: "Message ID not found" });

  messages[index].from = payload.from;
  messages[index].text = payload.text;

  res.json({ message: "Message has been updated" });
});

// delete a message based on ID
app.delete("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id); // need this to be an integer so convert it now
  const index = messages.findIndex((message) => message.id === id); // gets index of the message who's ID matches the param id
  // if index === -1 findIndex couldn't find the element which means we can't delete it
  if (index === -1)
    return res.status(400).json({ message: "message ID not found" });

  messages.splice(index, 1); // remove that index
  res.json({ message: "Message successfully removed" });
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
