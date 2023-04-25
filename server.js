const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ exteded: false }));
app.use(express.json())
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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
/******************************* creating a message */
app.post("/messages", (req, res) => {
  console.log(req.body);
  res.json("i've got you'r message!")
});
/********************************get all messages */
app.get("/messages", (req, res) => {
  res.json({messages});
});


// app.listen(process.env.PORT);
app.listen(3000, () => console.log("server is listening to Port 3000"));
