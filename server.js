const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let newId = 1;
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//  Read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// retrieve created the message from frontend
app.post("/messages", (req, res) => {
  const newMessage = {
    id: newId,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date(),
  };

  // check for empty or missing text from property
  if (newMessage.from !== "" && newMessage.text !== "") {
    messages.push(newMessage);
    newId++;
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {

  const findMessage = messages.filter(
    (message) => message.id === parseInt(req.params.id)
  );
  if (findMessage.length > 0) {
    res.json(findMessage);
  } else {
    res.sendStatus(404).json({ error: "Message not found" });
  }

  // const findMessage = messages.find((message) => message.id === req.params.id);

  // if (findMessage === undefined) {
  //   res.sendStatus(404);
  //   res.send({ message: "Message not found" });
  // } else {
  //   res.json(findMessage);
  // }
});

// Delete a message, by ID
app.delete("/messages/:id", (req, res) => {
  // const {id} = req.params;
  // messages.forEach(message => {
  //   if(message.id === id){
  //     messages.splice(message, 1);
  //   }
  // })
  //  res.sendStatus(204);
  //  res.send(messages);

  const deleteMessage = messages.findIndex((message) => message.id === req.params.id);
  if (deleteMessage > 0) {
    messages.splice(deleteMessage, 1);
  }
  res.sendStatus(204);
  res.send(messages);
});

//Check that port 4040 is not in use otherwise set it to a different port
const PORT = process.env.PORT || 4040;

//Start our server so that it listens for HTTP requests!
app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
// app.listen(process.env.PORT);

/************************************************************/
