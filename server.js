const express = require("express");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");

let messages = require("./messages.json");

const app = express();


const save = () => {
  fs.writeFile(
    "./messages.json",
    JSON.stringify(messages, null, 2),
  (err) => {
    if (err) {
      throw err;
    }
  });
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

let Id = 1;
app.post("/message", (request, response) => {
  const message = {};
  message.id = Id;
  message.from = request.body.from;
  message.text = request.body.text;

  if (message.from != " " && message.text != "") {
    messages.push(message);
    Id = Id + 1;
    save();
    response.json(
      {
        status: "success",
        message: "request.body",
      }
    );
  } else {
    response.json(400)
}
});

app.listen(port);
