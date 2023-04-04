const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const port = 5555;

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

app.get("/messages", function (request, response) {
  console.log(messages);
  response.send(messages);
});

app.post("/messages", function (request, response) {
  const newPost = { id: 1, from: "Karleen", text: "hello" };
  allPosts.push(newPost);
  response.status(201).send(newPost);
});

app.get("/messages/:id", function (request, response) {
  const userId = request.params.id;
  let findMessage = messages.find((message) => message.id === Number(userId));
  console.log(findMessage);
  response.send(findMessage);
});

app.put("/messages", function (req, res) {
  welcomeMessage.push(...req.body);
  res.json(welcomeMessage);
});

app.delete("/messages/:id", function (request, response) {
  const userId = request.params.id;
  welcomeMessage.filter((message) => message.id !== Number(userId));
  response.status(204).send();
});

app.listen(port, () => console.log(`running port ${port}`));
