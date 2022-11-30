const express = require("express");
const cors = require("cors");

const app = express();
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

app.use(express.json()); // before our routes definition

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (req, res) {
  console.log("POST /messages route");
  let newChat = req.body;
  messages.push(newChat);
  res.status(200).send(messages);
  console.log(messages);
});

app.get("/messages", function (req, res) {
  res.status(200).send(messages);
});

app.get("/messages/:id", function (req, res) {
  let id = request.params.id;
  res.status(200).send(messages.filter(chat => chat[id] === id));
});





let port = 3001 || process.env.PORT;
app.listen(port, () => console.log("Server is running on port " + port));
