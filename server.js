const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({ exteded: false }));
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
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.post("/messages", (req, res) => {
  const { id, from, text } = req.body;
  console.log( `${text} ${from} with id ${id}`)
  res.send(`message created from ${from} !` );
});

// app.listen(process.env.PORT);
app.listen(3000, () => console.log("server is listening to Port 3000"));
