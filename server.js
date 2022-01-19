const express = require("express");
const logger = require("./logger");
//const cors = require("cors");
const app = express();

//to read data from form
app.use(express.urlencoded({ extended: true }));

//using created middleware logger
app.use(logger);


app.use(express.json());
//app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

let nextId = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//get all messages
app.get("/messages", (req, res) => {
  if(messages){
    res.json(messages);
  } else {
    res.json({ message: `No data to show.`});
  }
  
});

//get messages by search text, return text or user match
app.get("/messages/search", (req, res) => {
  let searchText = req.query.text;
  console.log(searchText);
  const filterByText = messages.filter((item) =>
    item.text.toLowerCase().includes(searchText.toLowerCase())
  );
  if (filterByText.length > 0) {
    res.json(filterByText);
  } else {
    res
      .status(400)
      .json({ message: `No message with the text: ${searchText}` });
  }
});

//get last ten messages
app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
})

//get message by id
app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const filterById = messages.find((item) => item.id === messageId);

  if (filterById) {
    res.json(filterById);
  } else {
    res.status(400).json({ message: `No message with id:${messageId} found!` });
  }
});

//add new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: nextId++,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(400).json({ message: "Some data are missing" });
  } else if (
    messages.find(
      (item) => item.from === newMessage.from && item.text === newMessage.text
    )
  ) {
    res.status(400).send({ message: `Message already exist!` });
  } else {
    messages.push(newMessage);
    //nextId++;
    res.status(201).json(newMessage);
  }
});

//delete message by id
app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const found = messages.find((item) => item.id === messageId);
  if (found) {
    messages = messages.filter((item) => item.id != messageId);
    res
      .status(200)
      .json({ message: `Message with id: ${req.params.id} deleted!` });
  } else {
    res
      .status(400)
      .json({ message: `No message with id: ${req.body.id} found` });
  }
});

//Port for server to connect to
const PORT = process.env.PORT || 5006;

//app.listen(process.env.PORT);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
