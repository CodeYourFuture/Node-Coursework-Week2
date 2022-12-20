const express = require("express");
const cors = require("cors");

const app = express();

//app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

const welcomeMessage =
{
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response)
{
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT);





app.get("/messages", (req, res) =>
{
  res.send(messages);
});

app.post("/messages", (req, res) =>
{
  let msgName = req.body.from;
  let msgText = req.body.text;
  let idPosition = messages.length;

  const newMsg =
  {
    id: idPosition,
    name: msgName,
    message: msgText,
    timeSent: new Date(),
  };

  if (!newMsg.name || !newMsg.message)
  {
    return res.status(400).json("Please include a name and message");
  }

  else
  {
    messages.push(newMsg);
    res.status(200).json(messages);
  }
});



app.get("/messages/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  let filterMsg = messages.filter(msg => msg.id === id);

  res.send(filterMsg);
});

app.get("/messages/delete/:id", function (req, res)
{
  let id = parseInt(req.params.id);
  let filterdMsg = messages.filter(msg => msg.id === id);

  messages = messages.filter(msg => msg.id !== id);

  res.send(filterdMsg);
});

app.get("/search", (req, res) =>
{
  let textSearch = req.query.text;
  let filterdMsg = messages.filter(msg => msg.text.includes(textSearch));

  res.send(filterdMsg);
});

app.get("/latest", (req, res) =>
{
  let filterdMsgs = messages.filter(msg => parseInt(msg.id) > (messages.length - 11));

  res.send(filterdMsgs);
});
