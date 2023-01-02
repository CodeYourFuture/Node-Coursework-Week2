const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 7000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  timeSent: new Date().toLocaleDateString(),
  from: "Dawit",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];
let incrementId = 1;

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/search", (req, res) => {
  const search = req.query.term;
  const result = messages.filter((message) =>
    message.from.toLowerCase().includes(search.toLowerCase())
  );
  res.send(result);
});
// app.get("/messages/latest/", (req, res) => {
//   let latestMsg = messages.filter(
//     (messages, index) => messages.length - 10 <= index
//   );
//   res.send(latestMsg);
// });
app.get("/messages/latest", (req, res) => {
  let latestMsg = messages.slice(-3);
  res.json(latestMsg);
});

app.get("/messages/:id", (req, res) => {
  let foundMsg = messages.find((msg) => msg.id == req.params.id);
  res.send(foundMsg);
});

app.post("/messages", (req, res) => {
  if (!req.body.from || !req.body.text) {
    res.status(400).json({ msg: "Please make sure to include text and from" });
    return;
  }

  const newMessage = {
    id: incrementId,
    timeSent: new Date().toLocaleDateString(),
    from: req.body.from,
    text: req.body.text,
  };
  incrementId += 1;
  messages.push(newMessage);
  res.json(messages);
});

app.delete("/messages/:id", function (request, response) {
  const selectedId = request.params.id;
  const found = messages.some((message) => message.id == selectedId);
  if (found) {
    messages = messages.filter((message) => message.id != selectedId);
    response.status(204).json({ msg: `Message has been deleted` });
  } else {
    response
      .status(400)
      .json({ msg: `No message with the id of ${selectedId}` });
  }
});

app.put("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => id === msg.id);
  if (message) {
    let query = req.body;
    message.from = query.from;
    message.text = query.text;
    res.json(message);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
