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
// const messages = [welcomeMessage];

app.get("/", function (req, res) {
  console.log("Server is up");
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  console.log();
  res.status(200).send(welcomeMessage);
});

app.post("/messages", (req, res) => {
  const { from: from, text: text } = req.body;

  if (form && text) {
    welcomeMessage.push({
      id: welcomeMessage.length + 1,
      from: from,
      text: text,
    });
    res.status(201).redirect("/");
  } else if (!form) {
    res.status(400).send("You missing your name");
  } else if (!text) {
    res.status(404).send("You missing your message");
  } else if (!form && !text) {
    res.status(400).send("Your missing everything");
  }
});

app.listen(process.env.PORT);
