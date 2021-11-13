const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const app = express();
// app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

//get html page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

//get all messages
app.get("/messages", (request, response) => {
  response.status(200).send(messages);
})

// get one message by id
app.get("/messages/:id", (request, response) => {
  let messageId = messages.find(message => {
    if(message.id == request.params.id) {
      return message;
    }
  })
  response.status(200).json(messageId);
})


// post a message
app.post('/messages', (request, response) => {
  console.log(request.body);
  // request.body.id = parseInt(request.body.id); // change id format from string to integer

  const newMessage = {
    "id": uuid.v4(),
    "from": request.body.from,
    "text": request.body.text
  }
  console.log(newMessage);

  messages.push(newMessage);
})


// messages whose text contains a given substring: `/messages/search?text=express`
app.get("/messages/search", (request, response) => {
  const searchText = request.query.text.toLowerCase();
  const filteredMessage = messages.filter((msg) => msg.text.includes(searchText));
  response.json(filteredMessage);
})

// 10 latest messages
app.get("/messages/latest", (request, response) => {
  const latestMessages = messages.slice(-10);
  response.json(latestMessages);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
