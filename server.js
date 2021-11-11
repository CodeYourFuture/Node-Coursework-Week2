const express = require('express');
const app = express();  
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

// app.use('/messages', require('./routes/messages/messages'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Add a new message to the messages
app.post("/messages", function (req, res) {
  const lastIndex = messages.length - 1;
  const lastId = messages[lastIndex].id;
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  const newMessage = {
    "id" : lastId + 1,
    "from": req.body.from,
    "text": req.body.text,
    "timeSent": dateTime
  };
  
  if(!newMessage.from || !newMessage.text) {
    res.sendStatus(400);
  } else {
    messages.push(newMessage);
    res.status(200).send(messages);
  }
})

// Read all messages
app.get("/messages", function (req, res) {
  res.send(messages);
})

// Read messages whose text contains a given substring: `/messages/search?text=express`
app.get('/messages/search', function (req, res) {
  const searchText = req.query.text;
  const foundMessages = messages.filter((msg) => msg.text.includes(searchText));
  res.send(foundMessages);
})

// Read only the most recent 10 messages: `/messages/latest`
app.get('/messages/latest', function (req, res) {
  const latestTenMessages = messages.slice(-10)
  res.send(latestTenMessages);
})

// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  const message = messages.filter((m) => m.id == id);
  res.send(message);
})

// Update text or from property
app.put('/messages/update/:id', function (req, res) {
    const message = messages.find(({id}) => id === parseInt(req.params.id));
    if(message === undefined) {
       return res.status(400).send({ "msg": `No message with the id of ${req.params.id}`});
    }
    const updMessage = req.body;
    message.from = updMessage.from;
    message.text = updMessage.text;
    res.send(message);
})



app.listen(port, () => {
  console.log(`The server is listening on PORT ${port}`);
});
