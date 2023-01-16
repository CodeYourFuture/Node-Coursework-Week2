const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); // before our routes definition

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let count = 0;
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
// show all massages
app.get("/messages", (res, resp) => {
  resp.json({ messages });
});
app.get("/messages/:id", (req, resp) => {
  const massageId = Number(req.params.id);
  const showMassage = messages.filter((massge) => massge.id === massageId);
  resp.json(showMassage);
});

app.delete("/messages/:id", (req, res) => {
  const massageId = Number(req.params.id);
  messages = messages.filter((mass) => mass.id !== massageId);
});

// add new massages
app.post("/messages", (rec, resp) => {
  const newMasseg = rec.body;
  // input valdation
  if (
    newMasseg.from === "" ||
    newMasseg.from === undefined ||
    newMasseg.text === "" ||
    newMasseg.text === undefined
  ) {
    resp.send("Missing Information >>");
  } else {
    let usermassage = {
      id: count++,
      from: newMasseg.from,
      text: newMasseg.text,
    };
    messages.push(usermassage);
    resp.json({ usermassage });
  }
});

//process.env.PORT
app.listen(5500, () => {
  console.log("I'm Listen now :) ");
});
