const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const app = express();

app.use(cors());

app.use(express.json());

// submitted by HTML form
app.use(express.urlencoded({ extended: false }));

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

app.get("/messages", (req, res) => {
  res.json(messages);
});

// Send a message
app.post("/messages", (req, res) => {
  console.log(req.body);
  const newMessage = {
    /*id: uuid.v4(),*/ //to be used in the generating of random id but for now i'm using the below method for ease of access
    id: messages.length,
    from: req.body.from,
    text: req.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    //add return if there is no else statement following the if statement.
    return res
      .status(400)
      .json({ msg: "Please include a name and message." });
  }

  messages.push(newMessage);
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  const inputId = parseInt(req.params.id);
  let messageReturned = messages.filter(
    (message) => message.id === inputId
  );
  console.log(messageReturned);
  res.send(messageReturned);
});

const port = 3001;
const listener = app.listen(/*process.env.PORT*/ port, () => {
  console.log(`server started on port: ${listener.address().port}`);
});
