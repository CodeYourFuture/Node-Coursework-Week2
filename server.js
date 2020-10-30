const express = require("express");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT || 4444;

const bodyParser = require("body-parser");

let messages = require("./messages.json");

const app = express();

const save = () => {
  fs.writeFile(
    "./messages.json",
    JSON.stringify(messages, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};
app.use(express.static(".index.html"));

app.use(cors());

app.use(bodyParser.json());
// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
  response.send(`All messages are ${messages.length}`);
});

app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(-10));
  response.send("Latest Found");
});

//Create/update = POST
app.post("/message", (request, response) => {
  // const message = request.body;
  // const message = {};
  message.id = Id;
  message.from = req.body.from;
  message.text = req.body.text;
  if (message.from != "" && message.text != "") {
    messages.push(message);
    console.log(message);
    Id++;
    save();
    response.json({
      status: "success",
      message: request.body,
    });
  } else {
    res.sendStatus(400);
  }
});
app.get("/message/:id", function (request, response) {
  let { id } = request.params;

  const messages = messages.find((msg) => msg.id == id);
  response.json(id);
  // req.params.albumId will match the value in the url after /albums/
  console.log(request.params.id);
});

app.delete("/messages/:id", (request, response) => {
  const { id } = req.params;
  messages.forEach((msg) => {
    if (msg.id == id) {
      messages.splice(msg, 1);
    }
  });
  // // const id = request.params.id;
  // messages = messages.filter((def) => {
  //   if (def.id !== request.params.id) {
  //     return true;
  //   }
  //   return false;
  // });
  response.json({
    status: "success",
    removed: request.params.id,
    newLength: messages.length,
  });
});

//Search
app.get("/messages/search", (request, response) => {
  const term = request.query.term;
  const search = messages.filter(
    (item) =>
      item.from.toLowerCase().includes(term.toLowerCase()) ||
      item.text.toLowerCase().includes(term.toLowerCase())
  );
  if (term != null) {
    response.send(search);
  } else {
    response.end();
  }

  // let term = req.query.search;
  // res.send(`${searchQuery}`);
});

app.listen(port);
