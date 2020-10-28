const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3333;

const bodyParser = require("body-parser");

const app = express();

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
app.get("/chat", function (request, response) {
  response.json(messages);
});

//Create/update = POST
app.post("/chat", (request, response) => {
  const msg = request.body;
  messages.push(msg);
  response.json("Message Added ");
  console.log(msg);
});
app.get("/chat/:id", function (req, res) {
  let { id } = req.params;

  const msg = messages.find((msg) => msg.id == id);
  res.json(id);
  // req.params.albumId will match the value in the url after /albums/
  console.log(req.params.albumId);
});

app.delete("/chat/:id", function (req, res) {
  const { id } = req.params;
  messages.forEach((msg) => {
    if (msg.albumId == id) {
      messages.splice(msg, 1);
    }
  });
  res.json("Chat deleted sucessfully.");
});

app.listen(port);
