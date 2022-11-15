const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// submitted by HTML form
app.use(express.urlencoded({ extended: false }));

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

app.get("/messages", (req, res) => {
  res.send(welcomeMessage);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);
  res.send(messages);
});

const port = 3001;
const listener = app.listen(/*process.env.PORT*/ port, () => {
  console.log(`server started on port: ${listener.address().port}`);
});
