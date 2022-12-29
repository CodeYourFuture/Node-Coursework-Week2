const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();


let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let maxID = Math.max(...data.map((c) => c.id));
const messages = data;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Level 1 Challenge - make the chat server
// api
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


/* Create a new message (Level2- reject requests if the message objects have empty or missing `text` or `from` property.
server should return a status code of `400`.) */
app.post("/messages", (req, res) => {
  if (!req.body.from || !req.body.text) {
    res.status(400).send("Please Complete all fields");
    return;
  }
  let newID = Math.max(...data.map((msg) => msg.id)) + 1;
  let newMessage = { id: newID, from: req.body.from, text: req.body.text };
  data.push(newMessage);
  save();
  res.json(newMessage);
});

// Read all messages
app.get("/messages", function (req, res) {
  res.json(data);
});


//Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
    const id = parseInt(req.params.id)
    res.json(data.find(c => c.id === id))
})



// Delete a message, by ID
app.get("/messages/delete/:id", function (req, res) {
  const id = parseInt(req.params.id)
    if (!Number(id)) {
    res.send("Provide a Number, Please");
  }
  const characterIndex = data.findIndex((c) => c.id === Number(id));
  data.splice(characterIndex, 1);
  save();
  res.send(data);
});


//Saves edited data
const save = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

//listening on PORT 3000
app.listen(3000, function () {
  console.log("Your app is listening on port 3000 ");
});