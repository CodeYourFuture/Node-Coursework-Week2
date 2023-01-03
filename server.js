const express = require("express");
const cors = require("cors");
const { request } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const myMessage = {
  id: 1,
  from: "Jade",
  text: "test"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, myMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// creating id number
let maxID = Math.max(...messages.map(c => c.id));

// create a message
app.post("/messages",  (req, res) => {
  let newMessage = {
    "id": ++maxID,
    "from":req.body.from,
    "text":req.body.text,
  }
  if (!(req.body.from || !req.body.text)) {
    res.status(400).send("All fields are required to be entered");
  } else {
    messages.push(newMessage);
    res.status(200).json(newMessage);
  }
  }
)

// read all messages
app.get("/messages", (req, res) => {
  res.json(messages)
})

// read one message specified by id
app.get("/messages/:id", (req, res) => {
 const id = Number(req.params.id);
 const oneMessage = messages.find(message => message.id === id);
 res.status(200).json(oneMessage);
 })


// // delete a message specified by id
app.delete("/messages/:id", (req,res) => {
  const messageId = Number(req.params.id);
  const messageIndex = messages.findIndex(message => message.id === messageId)

  if (messageIndex < 0){
    res.sendStatus(404)
    return
  }

  messages.splice(messageIndex, 1)
  res.send("message deleted")
});



const port = process.env.PORT || 4200;
app.listen(port, () =>{
  console.log(`listening on port : ${port}`)
});
