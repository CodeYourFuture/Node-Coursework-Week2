const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // before our routes definition
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  console.log(__dirname + "/index.html");
});
app.post("/messages", function (req, res) {
  console.log("POST /messages routes");
  console.log(req.body);

  messages.push(req.body);
  res.sendStatus(200);
});

app.get("/messages", function (req, res){
 res.send(messages);
})

app.get("/messages/:id", (req, res) => {
 const id = Number(req.params.id);
const requiredMessage = messages.find(message => message.id === id);
res.send(requiredMessage);
})
app.delete('/messages/:id', (req, res) => {
  const toDelete = parseInt(req.params.id);
    const notDeleted = messages.filter(message => message.id !== toDelete);
    messages = notDeleted;
  res.status(200).json({success: true});
});

app.listen(process.env.PORT);

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});