const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const myMessage = {
  id: 1,
  from: "Jas",
  text: "Hello, how are you?",
};

const joannaMessage = {
  id: 2,
  from: "Joanna",
  text: "Have a lovely day",
};

const messages = [welcomeMessage, myMessage, joannaMessage];

//create message

app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  const newMessage = {
    id: messages.length,
    from,
    text,
    timeStamp: (TimeDate = new Date()),
  };

  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json("Please include a name and message");
  }
  messages.push(newMessage);
  res.send(messages);
});
//read all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

//Read one message specified by an ID
app.get("/messages/:ID", (req, res) => {
  const { ID } = req.params;
  const messageWithId = messages.find((elem) => elem.id == ID);
  res.send(messageWithId);
});

//Delete a message, by ID
app.delete("/messages/:ID", (req, res) => {
  const ID = req.params.ID;
  const notDeletedMessage = messages.filter((elem) => elem.id != ID);
  res.send(notDeletedMessage);
});

//read only messages with given substring
app.get("/messages/search", (req, res) => {
  let messageRead = messages.filter((message) =>
    message.text.includes(req.query.text)
  );
  res.send(messageRead);
});

//read the latest messages
app.get("/messages/latest", (req, res) => {
  if(messages.length >= 2){
    return res.send(messages.slice(messages.length - 2));
  } else {
  res.send(messages);
  }
});

//updated functions
app.put('/messages/:ID', (req, res) => {
  const { ID } = req.params;
  const objWithId = messages.find(elem => elem.id == ID);

  if(objWithId) {
    const updateMessage = req.body;
    messages.forEach(elem=>{
      if(elem.id == req.params.ID){
        elem.text = updateMessage.text;
      }
    })
    res.json(updateMessage)
  }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server on port 3000"));
