const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let nextMessageID = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/message", (req, res) => {
  const newMessage = req.body;
  messages.id = nextMessageID;
  messages.push(newMessage);
  nextMessageID++;

  res.send(messages);
});

app.get("/message", (req, res) => {
  res.json(messages);
});

// app.listen(process.env.PORT)
app.listen(port, () => {
  console.log("Server is listening to the port 3000...");
});

//
