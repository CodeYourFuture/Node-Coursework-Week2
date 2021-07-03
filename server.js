const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

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

// Read all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});



app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(PORT);
