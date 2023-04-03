const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json())

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
  response.send(messages);
  });

app.post("/messages", function (req, res) {
  messages.push(req.body);
});


// app.get("/messages/:id", function (request, response) {
//   const id = request.params.id;
//   console.log(id);
//   filteredms = messages.find((item) => item.id === id);
//   response.json(filteredms);
// });

// app.get("/messages/:id", function (req, res) {
//   id = req.params.id
//   const filtered = messages.find (item => item.id === id) ;
//   res.json(filtered)
//   console.log(req.params.id);

// });

//  app.delete("/messages/:id", function (req, res) {
//   console.log("DELETE ");
//  });

app.delete("/messages/:id", (req, res) => {
  const messageIndex = messages.findIndex(
    (message) => message.id === parseInt(req.params.id)
  );
  if (messageIndex === -1) {
    return res.status(404).send("Message not found");
  }
  messages.splice(messageIndex, 1);
  res.sendStatus(204); // Send a "No Content" response
});








app.listen(port, function(){
  console.log("go to this port");
});
