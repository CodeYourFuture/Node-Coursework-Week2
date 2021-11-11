const express = require("express");
const cors = require("cors");
//const bp = require("body-parser");
const app = express();

app.use(express.json()) // to convert body into json 
app.use(cors());
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
  // response.sendFile(__dirname + "/index.html");
  response.json(messages);
});

app.get("/messages/:id", (req,res) => {
  let id = Number(req.params.id)
  let filtered = messages.filter((elem) => elem.id === id)
  res.send(filtered)
})
app.get("/messages", function (request, response) {
  response.json(messages)
  // response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  // console.log(req.body);
  // let from = req.body.from;
  // let text = req.body.text;
  // let id = messages.length;
  // console.log(id)
  // let newObj = {
  //   id: id,
  //   from: from,
  //   text: text
  // }
  // messages.push(newObj);

  const newMessage = req.body;
  newMessage.id = messageCounter ++; 
  messages.push(newMessage);
  res.status(201).send("Thanks for posting");
});
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
