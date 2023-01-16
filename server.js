const express = require("express");
const cors = require("cors");

// const port = 9000;

const app = express(); // creates an instance of an express server
app.use(express.json()); // to support JSON-encoded bodies
app.use(cors()); // Cross Origin Resource Sharing

const welcomeMessage = {
  // id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = [welcomeMessage];

// Create a new message

app.post("/messages", function (request, response) {
  const error = new error("message not valid");

  const message = messages.filter((message) => {
    if (message.id === "") {
      return console.log("error");
    } else {
      return response.send({ messages }).json;
    }
  });
});
app.post("/messages", function (request, response) {
  const newMessage = {
    // id: uuid.v4(), //==> random id generator <==
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text,
    status: "active",
  };

  if (!newMessage.from || !newMessage.text) {
    response.status(400).json({ msg: "Please include a name and a text" });
  }

  messages.push(newMessage);
  response.json(messages);
});

//read all messages
app.get("/Messages", function (request, response) {
  response.send({ messages }).json;
});

//read one message specified by an ID
app.get("/readMessages/:id", function (request, response) {
  const id = Number(request.params.id); // the id is a string, so we need to convert it to a number
  const message = messages.find((message) => message.id === id);
  response.send(message);
});

//delete a message, by ID
app.delete("/deleteMessages/:id", function (request, response) {
  const id = Number(request.params.id);
  const message = messages.find((message) => message.id === id);
});

/////////////////////// DO NOT TOUCH BELOW CODE ///////////////////////////

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
