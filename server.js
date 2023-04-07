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
app.get("/messages", function (requests, response) {
  response.json({ messages });
});
app.get("/messages/:id");

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });
app.listen(port);
