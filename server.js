const express = require("express");
const bodyParser = require("body-parser");

// const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());// this is to allow cross origin resource sharing (CORS) so that your API is publicly available.
let idCount = 0;
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//🌧

app.use(express.json()); // use this line to parse the body of the request as JSON data and add it to the request object as req.body (this is what we need to do to be able to read the data sent from the client)
//🌧
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//🌧
app.get("/messages", function (request, response) {
  response.json(messages);
});

app.post("/messages", (req, res) => {
  // console.log(req);
  if (!req.body.from || !req.body.text)
    return res.status(400).json({ message: "Please enter from and text." });

  idCount++;

  const message = {
    id: idCount,
    from: req.body.from,
    text: req.body.text,
  };

  messages.push(message);
  console.log("message added");
  res.redirect("/");
});

app.get("/messages/search", function (request, response) {
  const search = request.query.text;
  const filteredMessages = messages.find(
    message => message.text.toLowerCase() === search.toLowerCase()
  );
  response.json(filteredMessages);
});

app.get("/messages/latest", function (request, response) {
  const latestMessages = messages.slice(-1).pop();
  response.json(latestMessages);
});

app.get("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const message = messages.find(message => message.id === id);
  if (message) {
    response.json(message);
  } else {
    response.status(404).send("Message not found");
  }
});

app.delete("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const messageIndex = messages.findIndex(message => message.id === id);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    response.status(204).send();
  } else {
    response.status(404).send("Message not found");
  }
});

app.put("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const messageIndex = messages.findIndex(message => message.id === id);
  if (messageIndex !== -1) {
    messages[messageIndex] = request.body;
    response.json(messages);
  } else {
    response.status(404).send("Message not found");
  }
});

app.listen(3000, function () {
  console.clear();
  console.log("Example app listening on port 3000!");
});
// app.listen(process.env.PORT);
// body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
// action in a form is the url that the form data will be sent to when the form is submitted
//(in this case, the url is /messages) and method is the HTTP method that will be used to
//send the data (in this case, POST) - the method and action together tell the form where to
//send the data when the form is submitted and how to send it (in this case, as JSON data)
