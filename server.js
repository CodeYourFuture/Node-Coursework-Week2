const express = require("express");
const cors = require("cors");
const path = require('path')
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.resolve(__dirname, "./client/build")))
const fs = require("fs");
let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.json(welcomeMessage).sendFile(__dirname + "/index.html");

// });

app.get("/", (req, res) => {
  res.json({ message: "Server is ready" });
});
app.get("/messages", (req, res) => {
  res.json(data);
});
app.post("/messages", (req, res) => {
  if (!req.body.from || !req.body.text) {
    res.status(400).json({msg: "Please fill all fields"});
    return;
  }
  let newID = Math.max(...data.map((msg) => msg.id)) + 1;
  let newMessage = { id: newID, from: req.body.from, text: req.body.text };
  data.push(newMessage);
  save();
  res.json(newMessage);
});

const save = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
