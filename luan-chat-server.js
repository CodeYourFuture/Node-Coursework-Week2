const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); //<-- need this to access request body
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const singleMessage = messages.filter((message) => message.id === idToFind);
  response.status(200).json(singleMessage);
});

app.post("/messages", (request, response) => {
  if (!request.body.from || !request.body.text)
    return response
      .status(400)
      .json({ message: "Please enter from and text." });

  idCounter++;

  const message = {
    id: idCounter,
    from: request.body.from,
    text: request.body.text,
  };

  messages.push(message);

  response.json({ message: "success" });
});

app.delete("/messages/:id", (req, res) => {
  messages = messages.filter((message) => message.id !== +req.params.id);
  res.json({ message: "deleted message" });
});

app.listen(9090 || process.env.PORT, () => {
  console.log("Application listening port 9090..");
});
