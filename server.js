const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");
//const bp = require("body-parser");
const app = express();

app.use(express.json()) // to convert body into json 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//app.use(bp.json());
// app.use(bp.urlencoded({ extended: true }));
// app.use(express.static("/index.html"));
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messageCounter = 1
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  // response.json(messages);
});

// Read all messages
app.get("/messages", function (request, response) {
  response.json(messages)
});

// Read _only_ messages whose text contains a given substring `/messages/search?text=express`
app.get(`/messages/search`, function (req, res) {
  const express = req.query.text;
  var searchedContent = messages.filter((message) =>
    message.text.toLowerCase().includes(express)
  );
  res.status(200).send(searchedContent)
});
// Read only the most recent 10 messages: `/messages/latest`
app.get(`/messages/latest`, (req, res) => {
  const latest = messages.slice(-10); 
  res.status(200).send(latest)
});

// Read one message specified by an ID
app.get("/messages/:id", (req,res) => {
  let id = Number(req.params.id)
  let filtered = messages.filter((elem) => elem.id === id)
  res.send(filtered)
})

// Create a new message
app.post("/messages", (req, res) => {
  console.log(req.body);
  let from = req.body.from;
  let text = req.body.text;
  let id = messages.length;
  console.log(id)
  if (from.length === 0 || text.length === 0){
    res.status(400).send('The name or the message has an issue.')
  }else {
    let newObj = {
      id: id,
      from: from,
      text: text,
    };
    messages.push(newObj);

    // const newMessage = req.body;
    // newMessage.id = messageCounter ++;
    // messages.push(newMessage);
    res.status(201).send("Thanks for posting");
  }
  
});

// Delete a message, by ID
app.delete("/messages/:id", (req,res) => {
  let id = Number(req.params.id);
  console.log(id)
  let index = messages.findIndex(ele => ele.id ===id);
  // if (index > -1) {
    messages.splice(index, 1);
  // }

  res.send("Id has been deleted") //.redirect("http://localhost:3000")
})
//console.log("hi")
// app.listen(process.env.PORT || 4001);
// console.log(process.env.PORT);
app.listen(4002);
