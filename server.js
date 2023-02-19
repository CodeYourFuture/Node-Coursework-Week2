const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage, { id: 10, from: "Lihle", text: "testing" }];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
  if (request.body.from.trim() === "" || request.body.text.trim() === "") {
    return response.status(404).send("Name and Message cannot be empty");
  }
  messages.push({ id: messages.length, ...request.body });
  response.status(200).redirect("/messages");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/search", function (request, response) {
  const filteredMessages = messages.filter((el) => {
    return el.text.toLowerCase().includes(request.query.text.toLowerCase());
  });
  response.send(filteredMessages);
});

app.get("/messages/latest", function (request, response) {
  const topTen = messages.slice(
    messages.length > 10 ? messages.length - 10 : 0
  );
  response.send(topTen);
});

app.get("/messages/:id", function (request, response) {
  const id = request.params.id;
  response.json(messages[id]);
});

app.get("/messages/delete/:id", function (request, response) {
  const id = request.params.id;
  messages = messages.filter((_, index) => {
    return index != id;
  });
  response.redirect("/messages");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
