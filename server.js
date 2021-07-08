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

app.get("/",  (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.listen (3000, () => {
  console.log("Node Server is listening on port 3000 and Ready For Requests");
});
