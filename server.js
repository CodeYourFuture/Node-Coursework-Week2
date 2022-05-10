const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const PORT = process.env.PORT || 5050;

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

let data = [""];

app.post("/:name", function (req, res) {
  const name = req.params.name;
  data.push(name);
  res.send(data);
});

app.post("/name", function (req, res) {
  // const name = req.body.name;
  const { name } = req.body;
  console.log(req.body);
  data.push(name);
  res.send(data);
});

app.delete("/:name", (req, res) => {
  data = data.filter((name) => name !== req.params.name);
  res.send(data);
});

// app.listen(process.env.PORT);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
