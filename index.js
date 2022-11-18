const express = require("express");
const _ = require("lodash");
const cors = require("cors");
const { json, response } = require("express");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));

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
  response.json(messages);
});

// Post a message
app.post("/messages", (request, response) => {

  if(!request.body.from || !request.body.text) {
    return response.status(400).json({msg: "Enter name and text"})
  }

  messages.push({
    id: messages.length,
    from: request.body.from,
    text: request.body.text
  })

  response.json(messages);
})

// Search message by id
app.get("/messages/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const found = messages.some(msg => msg.id === id);

  if(found) {
    response.json(messages.find(msg => msg.id === id));
  } else {
    response.status(400).json({msg: `No msg with id ${id}`});
  }
})

// Delete a message with id
app.delete("/messages/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const found = messages.some(msg => msg.id === id);

  if(found) {
    response.json(messages.filter(msg => msg.id !== id));
  } else {
    response.status(400).json({msg: `No msg with id ${id}`});
  }
})

const listener = app.listen(process.env.PORT, () => console.log(`http://localhost:${listener.address().port}`));

module.exports = app;