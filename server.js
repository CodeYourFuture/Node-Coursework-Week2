const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  response.json(messages);
});

/*to get all the messages*/
app.get("/messages", function (request, response) {
  response.json(messages);
});

/*To get by ID*/ 
app.get("/messages/:id", function (request, response) {
console.log(req.params, "<------- req params")
});

/*to post a message*/
app.post("/messages", function (req, res) {
  // console.log("req->", req.body);
  // console.log("POST /message route");
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).send({newMessage});
  console.log(messages);
});

// const PORT = 9090;
// app.listen(process.env.PORT);

app.listen(9090, () => {
  console.log("listening on port 9090");
});
