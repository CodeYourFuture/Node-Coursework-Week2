const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date()
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  if(req.body.from.length == 0){
    res.status(400).json("Please enter a from property")
    return
  }
  if(req.body.text.length == 0){
    res.status(400).json("please enter a text property")
    return
  }
  let message = {
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date()
  };
  messages.unshift(message);
  res.json("message has been send successfully");
});

app.get("/messages/search", (req, res) =>{
  console.log(req.query)
  let newMessages = messages.filter((message)=>{
    if(message.text.includes(req.query.text)){
      return true
    }

  })
  res.json(newMessages)
})


app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.slice(0,10)
  res.json(latestMessages);
});

app.get("/messages/:id", (req, res) => {
  console.log(req.params.id);
  let message = messages.find((msg) => {
    if (msg.id == req.params.id) {
      return true;
    }
  });
  res.json(message);
});

app.delete("/messages/:id", (req, res) => {
  let newMessages = messages.filter((msg) => {
    if (msg.id != req.params.id) {
      return true;
    }
  });
  messages = newMessages;
  res.json("message is deleted");
});




app.listen(7000);
