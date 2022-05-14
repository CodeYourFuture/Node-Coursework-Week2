const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//search 
function search(word) {
  return messages.filter((message) => message.text.includes(word));
}

app.get("/messages/search", function (request, response) {
  const searchWord = request.query.text; // text is coming from the url
  console.log(searchWord);
  const result = search(searchWord);
  response.send(result);
});

// GET Display all messages
app.get("/messages", (request, response) => {
  response.send(messages);
});

//latest messages
app.get("/messages/latest", (request, response) => {
  let latestMessages = messages.slice(-10);
  response.send(latestMessages);
});

// DELETE Delete a message by ID Use postman to do delete request
app.get("/messages/delete/:id", (request, response) => {
  let id = Number(request.params.id);
  let indexOfElement = messages.findIndex((message) => message.id === id);
  if (indexOfElement < 0) {
    response.status(404).send(`No message found with id ${id}`);
  } else {
    messages.splice(indexOfElement, 1);
    response.send(messages);
  }
});

//GET Read one message specified by  id
app.get("/messages/:id", (request, response) => {
  let messageById = messages.filter(
    (messasge) => messasge.id === parseInt(request.params.id)
  );
  if (messageById.length != 0) {
    response.send(messageById);
  } else {
    response.status(404).send(`Message with id ${request.params.id} not found`);
  }
});

// POST Adding  id in the body object and using the body object to take the values and pass them into messages
let count = 1;
app.post("/messages", (request, response) => {
  const { from, text } = request.body;
  console.log(messages.length);
  console.log(request.body);
  if (from.length === 0 || text.length === 0) {
    response
      .status(400)
      .send("You can not send a message  without a Name or a text Message.");
  } else {
    messages.push({
      id: count,
      from,
      text,
    });
  }
  count++;
  console.log(messages);
});
// Port
const PORT = 4000
app.listen(PORT,()=> console.log(`Port:${PORT}`));
