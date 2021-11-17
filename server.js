const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Homer",
    text: "Doh",
  },
  {
    id: 2,
    from: "Maggie",
    text: "I'm Maggie",
  },
]

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = welcomeMessage;

//all get requests
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
 response.json(messages);
});

app.get("/messages/search", (request, response) => {
  const searchWord = request.query.word.toLocaleLowerCase();
  const searchResult = messages.filter(msg => 
    msg.text.toLocaleLowerCase().includes(searchWord) || msg.from.toLocaleLowerCase().includes(searchWord)
  );
 response.json(searchResult);
});

app.get("/messages/:id", (request, response) => {
  const inputId = request.params.id;
  if (inputId) {
    const message = messages.find(res => res.id === parseInt(inputId));
    response.json(message);
  } 
});

//Post request creating a new message
app.post("/messages", (request, response) => {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };
  const newMessagePushed = messages.push(newMessage);
  response.json(newMessagePushed)

  console.log("Added successfully!");
  
});

//Delete request 
app.delete("/messages/:id", (request, response) =>{
  const inputId = request.params.id;
  if (inputId) {
    const messageIndex = messages.findIndex(response => response.id == inputId);
    const msgSpliced = messages.splice(messageIndex, 1);
    response.json(msgSpliced);
  }
  console.log("Deleted successfully");
  
})

app.listen(PORT, (req, res) => {
  console.log(`listening at port ${PORT}`);
});
