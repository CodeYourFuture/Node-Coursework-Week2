const express = require("express");
const cors = require("cors");
const port = 3001;

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

// Read all the messages
app.get("/messages", function (request, response) {
  response.json({ messages });
});

// Read a message by ID
app.get("/messages/:id", function (request, response) {
  let message = messages.filter(
    (message) => message.id === Number(request.params.id)
  );
  response.status(200).send(messages);
});

// Delete a message by ID
app.delete("/messages/:id", function (request, response) {
  let message = messages.filter(
    (message) => message.id === Number(request.params.id)
  );
  response.json({ messages });
});

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });
app.listen(port);
