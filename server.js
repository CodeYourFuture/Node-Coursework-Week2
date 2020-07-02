const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyparser());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: __dirname });
});

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.json({ success: true });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  if (req.params.id) {
    const selectedMessage = messages.find(
      (message) => message.id === Number(req.params.id)
    );
    res.send(selectedMessage);
  } else {
    res.sendStatus(404);
  }
});
//    "3"   !=  3
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const filteredMessages = messages.filter((message) => {
    console.log(typeof message.id, message.id, typeof Number(id), Number(id));

    return message.id !== Number(id);
  });
  if (filteredMessages.length !== messages.length) {
    messages = filteredMessages;
    res.send({ message: "Object Deleted !" });
  } else {
    res.sendStatus(404);
  }
});

const myPort = process.env.PORT || 3001;
app.listen(myPort, () => {
  console.log(`Listening on port ${myPort}`);
});
