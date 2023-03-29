const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Shayan",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

// level3 [5] read only text whose text contains a given substring
// teniolao-cyf-chat-server.glitch.me/messages/search?text=express
app.get("/messages/search", (req, res) => {
  const { term } = req.query;
  console.log(term);

  const filterMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(term.toLowerCase())
  );
  console.log(filterMessages);
  res.send(filterMessages);
});

//[2] read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  //for(let i=)
  const filterMessages = messages.filter(
    (message, index) => messages.length - 10 <= index
  );
  res.send(filterMessages);
});

//[3] read one message specified by id
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  messages = messages.filter((message) => message.id === Number(id));
  res.status(200).send(messages);
});

// [1] create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  const ourMessageObject = {
    id: Date.now(), //use date was better unique id instead of array length
    from,
    text,
    timeSent: new Date().toLocaleDateString(),
  };
  messages.push(ourMessageObject);
  res.send("Message received successfully.");
});

//[4] delete a message by id
app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id !== Number(id));
  res.json(messages);
});

// [6] update a message by id
app.put("/messages/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  let updatedMessage;
  messages = messages.map((message) => {
    if (message.id === Number(id)) {
      updatedMessage = { ...message, text };
      return updatedMessage;
    }
    return message;
  });

  if (updatedMessage) {
    res.status(200).send(updatedMessage);
  } else {
    res.status(404).send("Message not found");
  }
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
