// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

// //This array is our "data store".
// //We will start with one message in the array.
// //Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });

// // app.listen(process.env.PORT);
// app.listen(3000);

process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");
const chatMessageModel = require("./dataModel"); // Import the data model

const app = express();

app.use(express.json()); // Parse JSON data in the request body
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// show all
app.get("/messages", function (req, res) {
  res.send(messages);
});

// find by id
app.get("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findByID = messages.find((message) => message.id === getById);
  if (!findByID)
    return res.status(404).send("Message with the given ID was not found");
  res.send(findByID);
});

// create new
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  if (!from || from.length < 3)
    return res
      .status(400)
      .send("Name is required & should be at least 3 characters");

  const newMessage = Object.assign({}, chatMessageModel); // Create a new chat message using the data model
  newMessage.id = messages.length + 1;
  newMessage.from = from;
  newMessage.text = text;

  messages.push(newMessage);
  res.json(messages);
});

// delete by id
app.delete("/messages/:id", (req, res) => {
  const getById = Number(req.params.id);
  const findByID = messages.find((message) => message.id === getById);
  const index = messages.indexOf(findByID);

  if (!findByID)
    return res.status(404).send("Message with the given ID was not found");

  messages.splice(index, 1);
  res.status(200).send(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}...`);
});
