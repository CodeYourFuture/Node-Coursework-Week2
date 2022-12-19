const express = require("express");
const cors = require("cors");
const { request } = require("express");
const port = process.env.PORT || 3001;
const app = express();

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

// app.get("/", function (request, response) {
//   response.json(welcomeMessage).sendFile(__dirname + "/index.html");
// });

app.get("/", (req, res) => {
  res.json({ message: "Server is listening" });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  let newId = Math.max(...messages.map((message) => message.id)) + 1;
  let newMessage = { id: newId, from: req.body.from, text: req.body.text };
  messages.push(newMessage);
  res.json(newMessage);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
