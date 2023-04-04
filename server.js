const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function(request,response) {
  response.json(messages);
})

app.post("/messages", function (request, response) {
  console.log(request.body);
  response.json(request.body);
  messages.push(request.body);
  console.log(messages);
});

app.listen(process.env.PORT);
