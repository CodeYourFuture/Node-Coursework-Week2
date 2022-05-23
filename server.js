const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { request } = require("express");
const { response } = require("express");
const { status } = require("express/lib/response");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
const PORT = 3000;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.send(messages);
})

// keeps track of ids that have already been used
const idsAlreadyUsed = messages.map(message => message.id);

app.post("/messages", (request, response) => {
  console.log(request.body);
  const newMessage = {
    /*id function increments new ids based on 
     highest id number contained within above array */
    id: (Math.max(...idsAlreadyUsed) + 1),
    from: request.body.from,
    text: request.body.text,
  }
  messages.push(newMessage);
  idsAlreadyUsed.push(newMessage.id);
  console.log(idsAlreadyUsed);
});

app.get("/messages/:id", (request, response) => {
  const message = messages
    .find(message => message.id === Number(request.params.id));

  response.send(message);
})

app.delete("/messages/:id", (request, response) => {
  messages = messages.filter(message => message.id !== Number(request.params.id));
  response.sendStatus(200);
})


app.listen(PORT, console.log(`listening on ${PORT}`));
