const express = require("express");
const cors = require("cors");
let PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

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

// read first message

app.get("/messages", function (request, response) {
  response.json({
    data: messages,
    message: "ok",
  });
});
