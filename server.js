const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  time: new Date().toISOString().slice(11, 19),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// Home Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Create a new message
app.post("/messages", (req, res) => {
  //  res.send(req.body);
  const index = messages.length - 1;

  const newMessages = {
    id: index + 1,
    from: req.body.from,
    text: req.body.text,
    time: new Date().toISOString().slice(11, 19),
  };

  if (!newMessages.from || !newMessages.text) {
    return res
      .status(400)
      .json({ msg: "Please include a name and message" });
  }
  messages.push(newMessages);
  res.json(messages);
});

//search by a term
app.get("/messages/search", (req, res) => {
  const searchText = req.query.text.toLocaleLowerCase();
  const result = messages.filter(
    (message) =>
      message.from.toLocaleLowerCase().includes(searchText) ||
      message.text.toLocaleLowerCase().includes(searchText)
  );
  if (result.length === 0) {
    return res.status(400).json({ msg: `'${searchText}' Not Found!` });
  }
  res.send(result);
});

// Read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});

// Update a message's
app.put("/messages/:id", (req, res) => {
  const found = messages.some((message) => message.id === +req.params.id);
  if (found) {
    const updMessage = req.body;

    messages.forEach((message) => {
      if (message.id === +req.params.id) {
        message.from = updMessage.from ? updMessage.from : message.from;
        message.text = updMessage.text ? updMessage.text : message.text;

        res.json({ msg: "Message Updated", message });
      }
    });
    res.send(messages.filter((message) => message.id === +req.params.id));
  } else {
    res.status(400).json({ msg: `No Message with the id of ${req.params.id}` });
  }
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const found = messages.some((message) => message.id === +req.params.id);
  if (found) {
    res.send(messages.filter((message) => message.id === +req.params.id));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//   Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  const found = messages.some((message) => message.id === +req.params.id);
  if (found) {
    res.json({
      msg: `Message deleted ${req.params.id}`,
      message: messages.filter((message) => message.id !== +req.params.id),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
});


//  listening Port
app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
