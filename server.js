const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

//create message -- workson posting the msg, won't reload though
app.post("/messages", (req, res) => {
  const createMessage = {
    id: 3, 
    from: req.body.from,
    text: req.body.text
  };
  if(!createMessage) {
    return res.status(400).send("Please enter text");
  }
  messages.push(createMessage);
  res.json(messages);
} );


//read all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

//read a single message, by id
app.get("/messages/:id", (req, res) => {
  const result = messages.filter(message => message.id === parseInt(req.params.id))
  if(!messages.id) {res.status(300).send("message not found")}
  res.json(result);
})

//delete a single message, by id == logs message:id not found
app.delete("/messages/:id", (req, res) => {
  const deleted = messages.some(message => message.id === req.params.id)
  if (deleted) {
    res.json(messages.filter(message => message.id != req.params.id))
  res.send("message deleted")
} else {
  res.send(`message ${req.params.id} not found`)
}
  
})




app.get("/", function (request, response) {
  console.log(uuid());
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
  response.send(request.body);
}) //stopped in my attempts to get the think to post... on 01:09:20 of the crash course

app.listen(3000, () => {
  console.log(`app is listening on port ${3000}`)});
