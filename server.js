const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9090;

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

app.get("/", function (request, response) {
  response.status(200).send("response is sending")
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", function (request, response) {
  response.status(200).send({ messages })
});

app.get("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const message = messages.find((message) => message.id === idToFind);
  response.status(200).send({ message })
});

app.post("/messages", function (request, response) {
  console.log(request.body)
  const newMessage = request.body;
  messages.push(newMessage);
  response.status(201).send({ newMessage })
});
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
