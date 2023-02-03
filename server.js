const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Driss",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", (req, res) => {
  res.json(welcomeMessage);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  console.log(req.body);
  if (!req.body.from || !req.body.text) {
    response.status(400).json({
      msg: "Please Ensure All Fields Are Completed",
    });
    return;
  }
  messages.push(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
