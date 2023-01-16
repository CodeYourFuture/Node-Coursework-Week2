const express = require("express");
const cors = require("cors");
const engine = require('express-engine-jsx');
const bodyParser = require('body-parser');

const app = express();
app.set('views', 'views');
app.set('view engine', 'jsx');
app.engine('jsx', engine);

app.use(bodyParser.urlencoded({ extended: true }));

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
  response.render("index");
});
app.post("/messages", function (request, response) {
  const fromUser = request.body.from;
  const userText = request.body.text;
  if (userText.length > 0) {
    const message = {
      id: messages.length + 1,
      from: fromUser,
      text: userText
   };
    messages.push(message);
  } else {
    response.status = 400
  }

  response.render("messages", {messages: messages});
});
app.get("/messages", function (request, response) {
  response.render("messages", {messages: messages});
});

app.post("/messages/:messageId", function (request, response) {
  let messageId = request.params.messageId
  messages = messages.filter(message => message.id != messageId)
  
  response.render("messages", {messages: messages});
});

app.get("/messages/:messageId", function (request, response) {
  let messageId = request.params.messageId
  let result = messages.filter(message => message.id == messageId)
  response.render("messages", {messages: result});
});

app.get("/messages/search", function (request, response) {
  response.render("
  ", {messages: result});
});

app.get("/messages/latest", function (request, response) {
  
  response.render("messages", {messages: result});
});




app.listen(3000, () => {
  console.log('Listening on 3000')
});

