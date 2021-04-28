const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
// create a message
app.get("/messages", (req, res) => res.json(messages));

// update message
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  console.log(" New Message");
  res.json(newMessage);
});
// message specified by ID
app.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  const inbox = messages.find((inbox) => inbox.id === id);
  res.json(inbox);
});

//delete message by ID
app.delete("/messages/:ID", (req, res) => {
  const ID = req.params;
  messages.forEach((inbox) => {
    if (inbox.messagesID === ID) {
      messages.splice(inbox, 1);
      res.send("chat deleted");
    } else {
      res.statusres.status("400").send("Bad Request");
    }
    console.log("DELETE /messages route");
  });
});

const listener = app.listen(5555, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
