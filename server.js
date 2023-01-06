const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const fs = require("fs");

const app = express();
let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let maxId = Math.max(...data.map((ele) => ele.id));
const messages = data;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const WMessage = [welcomeMessage];

// create a message and post it to database
app.post("/messages", (req, res) => {
  let userName = req.body.userName;
  let userMessage = req.body.userMessage;
  if (userName === "" || userMessage === "") {
    res.status(400).send(`Invalid:No userName & userMessage`);
  } else {
    const newChat = {
      id: ++maxId,
      from: userName,
      text: userMessage,
    };
    data.push(newChat);
    save();
    res.send(data);
  }
});

// serves the main HTML file for the home page
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// give all the messages in the dataBase
app.get("/messages/search", (req, res) => {
  let userSearchId = req.query.randomNumber;
  if (!Number(userSearchId)) {
    res.send(`please insert a number`);
  }
  data.forEach((message) => {
    if (message.id === Number(userSearchId)) {
      res.status(200).send(message);
    }
  });
  res.status(404).send(`message doesn't exist `);
});

// Delete a message based on input Id

function isInvalidId(id, index, response) {
  if (index < 0) {
    response.status(404).json({
      msg: "No message with the Id '" + id + "' is found",
    });
  }
}
app.delete("/messages/:id", (req, res) => {
  let messageIndex = messages.findIndex(
    (message) => message.id === req.params.id
  );
  isInvalidId(request.params.id, msgIndex, response);

  messages.splice(messageIndex, 1);
  response.json({
    msg: "Message successfully deleted",
    messages: messages,
  });
});

// listening On port
const listener = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${listener.address().port}`);
});
