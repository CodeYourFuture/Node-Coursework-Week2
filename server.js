const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const GenerateUniqueId = () => Math.floor(Math.random() * uuid);

const messages = [welcomeMessage];

// app.get("", function (request, response) {
//   console.log(GenerateUniqueId)
//   response.send({ welcomeMessage });
// });

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/newMessages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(200).send(messages);
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = +request.params.id;

  const oneMessage = messages.find((el) => el.id === messageId);
  response.send({ oneMessage });
});
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
