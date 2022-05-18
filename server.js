const express = require("express");
const cors = require("cors");
const { response } = require("express");
const { request } = require("express");

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
console.log(messages);
// console.log(messages.map(message => message.from));
// console.log(messages.map(message => message.text));

const PORT = 3000;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (request, response) => {
  response.send(messages);
})

app.post("/messages", (request, response) => {

})

// const numberArray = [1, 2, 3, 4, 5];
// console.log(Math.max(...numberArray));

const idsAlreadyUsed = messages.map(message => message.id);
// console.log(idsAlreadyUsed);
const highestId = Math.max(...idsAlreadyUsed);
// console.log(highestId)





app.listen(PORT, console.log(`listening on ${PORT}`));
