const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());    

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const PORT = 9002;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app
  .get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
  })
  .post("/messages", function (request, response) {
    const newMessage = request.body;
    const lastMessage = messages[messages.length - 1];
    const newId = lastMessage.id;

    newMessage.id = newId + 1;

    messages.push(newMessage);
    response.send(messages);
  })
  .get("/messages", (request, response) => {
    response.send(messages);
  })
  .get("/messages/:id", (request, response) => {
    response.send(messages.find((message) => message.id === Number(request.params.id)));
  })
  .delete("/messages/:id", (request, response) => {
      messages = messages.filter((message) => {message.id === Number(request.params.id)});
    response.send(messages);
  })

app.listen(PORT, () => {
  console.log(`My server is running on ${PORT}`);
});