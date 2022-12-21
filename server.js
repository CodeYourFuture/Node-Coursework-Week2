const express = require("express");
const cors = require("cors");
const { response } = require("express");
const data = require("./data.json");

const app = express();

app.use(cors());

const welcomeMessage = {
  
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//send all messages

app.get("/messages", (req, res) => {
  res.json(data);
});

//send specific message by id

app.get("/messages/:id", (req, res) => {
  res.json(data.filter((e) => e.id == req.params.id));
});

app.listen(3000);
