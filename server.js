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

const messages = [welcomeMessage];
// Create a new message

app.post("/messages", function (request, response) {
  response.send({messages}).json;
});

//read all messages
app.get("/readMessages", function (request, response) {
  response.send({messages}).json;
});

//read one message specified by an ID
app.get("/readMessages/:id", function (request, response) {
  const id = Number(request.params.id);
  const message = messages.find((message) => message.id === id);
  response.send(message);
});


//delete a message, by ID
app.delete("/deleteMessages/:id", function (request, response) {
  const id = Number(request.params.id);
  const message = messages.find((message) => message.id === id);

});
//////////////////////////////////////////////////

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
