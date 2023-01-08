const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const PORT = process.env.PORT || 4200;


app.use(express.json());
app.use(express.urlencoded({extended:false}))


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

app.get("/messages", function (request, response) {
  response.status(200).send(messages);
});

// create 
app.post("/messages", function (request, response) {
  console.log("POST /messages route");
  let newMessage = request.body;
  messages.push(newMessage);
  response.status(200).json(messages);
  console.log(request.body);
});

//  Read one message specified by an ID
app.get("/messages/:id", function (request, response) {
  console.log(request.params.id);
  let id = parseInt(request.params.id);
  response.status(200).json(messages.filter((message) => message[id] === id));
  console.log(messages.filter((message) => message[id] === id));
});

//  Delete a message, by ID
app.delete("/messages/:id", function (request, response) {
  console.log("DELETE /messages route");
  let id = parseInt(request.params.id);
  response.status(200).json(messages.filter((message) => message[id] !== id));
  
});

app.listen(PORT, () =>{
 console.log(`The port is running on ${PORT}`)
});
