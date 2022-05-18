const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]


// level3 [5] read only text whose text contains a given substring
// teniolao-cyf-chat-server.glitch.me/messages/search?text=express
app.get("/messages/search", (req, res)=> {
  const { term } = req.query
  console.log(term)
  
  const filterMessages = messages.filter(message => message.text.toLowerCase().includes(term.toLowerCase()))
  console.log(filterMessages)
  res.send(filterMessages);
});

//[2] read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//read only the most recent 10 messages
app.get("/messages/latest", (req, res) => {
  //for(let i=)
 const filterMessages = messages.filter((message, index) => messages.length-10 <= index)
 res.send(filterMessages)
});

//[3] read one message specified by id
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  messages = messages.filter(
    (message) => message.id === Number(id)
  );
    res.status(200).send(messages);
});

// [1] create a new message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  // console.log(req.body)
  const ourMessageObject = {
    id: messages.length, 
    from,
    text,
    timeSent: new Date().toLocaleDateString()
  }
  if(from.length === 0 || text.length === 0){
    return res.status(400).send("please complete body")
  } else {
     messages.push(ourMessageObject);
  }
});

//[4] delete a message by id
app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id !== Number(id));
  res.json(messages);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server running!");
});
