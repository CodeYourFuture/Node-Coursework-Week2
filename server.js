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

// parse application/x-www-form-urlencoded - for accessing form
app.use(bodyParser.urlencoded({ extended: false }));

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  response.status(200).send("Welcome to my message App");
});

/*to get all the messages*/
app.get("/messages", function (request, response) {
  response.status(200).send({ messages });
});

/*to post a message*/
app.post("/messages", function (req, res) {
  const newMessage = req.body;
  /*access Id */
  const previousMessage = messages[messages.length - 1];
  const currentId = previousMessage.id + 1;

  /*merged objects in the final one*/
  const newMessageWithId = { ...newMessage, id: currentId };

  /*validate message text and from properties*/
  if (!newMessageWithId.text || !newMessageWithId.from) {
    return res.status(400).json({
      error: "Both name and message are required",
    });
  }

  messages.push(newMessageWithId);
  res.status(201).send({ newMessageWithId });
});

/*To get by ID*/
app.get("/messages/:id", function (request, response) {
  // console.log(request.params, "<------- req params");
  const idToFind = Number(request.params.id);
  const message = messages.find((message) => message.id === idToFind);
  console.log(message);
  response.status(200).send({ message });
});

/*to delete a message by ID */
app.delete("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const message = messages.find((message) => message.id === idToFind);
  const indexOfMessage = messages.indexOf(message);

  if (indexOfMessage !== -1) {
    messages.splice(indexOfMessage, 1);
    response
      .status(200)
      .send({ message: `Message with ID ${indexOfMessage} has been deleted` });
  } else {
    response
      .status(404)
      .send({ message: `Message with ID ${indexOfMessage} not found` });
  }

  // response.status(200).send({ message });
});

/*to search messages by text*/
app.get("/messages/search", function (req, res) {
  const searchText = req.query.text;
  const matchingMessages = messages.filter(
    (message) => message.text.indexOf(searchText) !== -1
  );
  res.status(200).send({ messages: matchingMessages });
});

/*to get the latest 10 messages*/
app.get("/messages/latest", function (req, res) {
  const latestMessages = messages.slice(-10);
  res.status(200).send({ messages: latestMessages });
});

// const PORT = 9090;
// app.listen(process.env.PORT);

app.listen(9090, () => {
  console.log("listening on port 9090");
});
