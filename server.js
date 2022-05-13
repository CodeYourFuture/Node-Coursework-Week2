const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
//order matters, make sure your routes are different if you have two routes that are the same only the first one will work
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//getting all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/search", function (request, response) {
  const { text } = request.query;
  const filtered = messages.filter((message) => message.text.includes(text));
  response.json(filtered);
});

app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(-10));
});

//posting a new message, look at this aagain
app.post("/messages", function (request, response) {
  const { from, text } = request.body;

  if (from === undefined || from === "" || text === undefined || text === "") {
    return response
      .status(400)
      .json(`please check that you have filled the form correctly`);
  }

  const newMessagePosted = {
    id: messages.length,
    from,
    text,
  };

  messages.push(newMessagePosted);
  console.log(messages);
  response.json("message created");
});

//gets message by id
app.get("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  const result = messages.find((message) => message.id === id);
  if (result) {
    response.json(result);
  } else {
    response.status(404).json("message not found");
    //respond.sendStatus(404) another way, look at this again
  }
});

//delets a message
app.delete("/messages/:id", function (request, response) {
  const id = Number(request.params.id);
  messages = messages.filter((message) => message.id !== id);

  response.json(`message deleted at id ${id}`);
});

//listening on port
app.listen(3001, () => {
  console.log("running at 3001");
});
