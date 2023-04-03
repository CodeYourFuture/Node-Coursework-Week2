const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Marziyeh",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// app.listen(process.env.PORT);
app.post("/messages", function (req, res) {
  const { from, text } = req.body;
  console.log(req.body);

  if (!from || !text) {
    return res
      .status(400)
      .json({ error: true, message: "There's an error!!!" });
  }

  const newMessage = {
    id: messages.length,
    from,
    text,
  };

  messages.push(newMessage);
  return res.status(201).json({ success: true, data: messages });
});

app.get("/messages", (req, res) => {
  console.log("this ran 2");
  return res.status(200).send(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageID = req.params.id;
  let findingID = messages.find((message) => message.id === +messageID);
  res.status(200).send(findingID);
  console.log(findingID);
});

app.delete("/messages/:id", (req, res) => {
  const messageID = req.params.id;
  let findingID = messages.find((message) => message.id === +messageID);
  let index = messages.indexOf(findingID);
  messages.splice(index, 1);
  console.log(index);
  res.status(204).send(findingID);
});

app.get("/messages/latest", (req, res) => {
  console.log("hello");
  const latest = messages.slice(0, 10);
  console.log("latest", latest);
  return res.status(200).json(latest);
});

// app.listen(process.env.PORT);
app.listen(4000, () => {
  console.log("Server is listening on port 4000. Ready to accept requests!");
});

