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
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
  messages.push({ id: messages.length, ...request.body });
  response.status(200).redirect("/messages");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  const id = request.params.id;
  response.json(messages[id]);
});

app.get("/messages/delete/:id", function (request, response) {
  const id = request.params.id;
  console.log(typeof id);
  messages = messages.filter((_, index) => {
    return index != id;
  });
  response.redirect("/messages");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
