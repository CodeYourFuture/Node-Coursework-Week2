const { request, response } = require("express");
const express = require("express");
//const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = 5000;
//app.use(cors());

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
app.post("/messages", (request, response) => {
  response.sendFile(__dirname + "/messages.html");
});
//app.listen(process.env.PORT);
app.listen(PORT);
