const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// | GET    | `/messages`    | return all messages    |
// | GET    | `/messages/17` | get one message by id  |
// | POST   | `/messages`    | create a new message   |
// | DELETE | `/messages/17` | delete a message by id |

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages)
})

app.post("/messages", (req, res) => {
  if(req.body.from && req.body.text) {
      let newMessage = {"id": messages.length, ...req.body}
     messages.push(newMessage)
     res.send(messages)
  }

  else {
    res.status(400).send("Please provide a name or message")
  }
});

app.get("/message/:id", (req, res) => {
  let id = req.params.id
 let singleMessage =  messages.find(c => c.id === Number(id))
 res.send(singleMessage)
})

app.delete("/messages/:id", (req, res) => {
  let id = req.params.id;
  let message = messages.filter(c => c.id !== Number(id))
  res.send(message)
})

//update messages 

app.patch("/messages/:id", (req, res) => {
  let id = req.params.id;
 let messages = messages.map(msg => {
    if(msg.id === +id) {
      msg.from = req.body.from || msg.from
      msg.to = req.body.to || msg.to
    }
    return msg
  })
  res.json(messages)
})

//  [ ] Read _only_ messages whose text contains a given substring: `/messages/search?text=express`
// - [ ] Read only the most recent 10 messages: `/messages/latest`

app.get("/messages/search", (req, res) => {
  if(req.query.text) {
    let copy = messages.filter(c => c.text.includes(req.query.text)) 
    res.send(copy)
  }
})

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(0, 11))
})
app.listen(3000);
