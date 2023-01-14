const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { query } = require("express");
const app = express();

let counter = 0;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  let newMessage = req.body;

  if (newMessage.from.trim() === "" || newMessage.text.trim() === "") {
    res.status(400).json("Please fill the form");
  } else {
    counter++;
    let creatMessage = {
      id: counter,
      from: newMessage.from,
      message: newMessage.text,
      date: new Date(),
    };
    messages.push(creatMessage);

    res.json("Form submitted successfully!");
    console.log(messages);
  }
});

app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
});

app.get("/messages/search", (req, res) => {
  const findItem = req.query.text;
  console.log(findItem, "---> req query");

  const selectedMessage = messages.filter((mess) =>
    mess.text.includes(findItem)
  );

  res.status(200).json(selectedMessage);
});

app.get("/messages/:id", (req, res) => {
  console.log(req.params, "----> request.params");

  const findItem = Number(req.params.id);

  const selectedMessage = messages.filter((mess) => mess.id === findItem);

  res.status(200).json(selectedMessage);
});

app.delete("message/:id", (req, res) => {
  const findItem = Number(req.params.id);
  console.log(findItem);
  messages = messages.filter((mess) => mess.id !== findItem);
});

app.listen(9000, () => {
  console.log("----> application is now listen to port 9000... ");
});
