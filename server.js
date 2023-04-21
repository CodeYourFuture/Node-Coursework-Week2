const express = require("express");
const cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

//Create a message + simple validation
app.post("/messages", function (request, response) {
  console.log({ body: request.body });
  const { from, text } = request.body;
  if (!from || !text) {
    return response.status(400).send("From and text are required fields.");
  }
  const newMessage = {
    id: messages.length,
    from: from,
    text: text,
    timeSent: new Date(),
  };
  messages.push(newMessage);
  response
    .status(200)
    .json({ message: "Message created successfully", newMessage });
});

// Read all the messages
app.get("/messages", function (request, response) {
  response.json({ messages });
});

// Read a message by ID
app.get("/messages/:id", function (request, response) {
  let message = messages.filter(
    (message) => message.id === Number(request.params.id)
  );
  response.status(200).send(messages);
});

// Delete a message by ID
app.delete("/messages/:id", function (request, response) {
  let message = messages.filter(
    (message) => message.id === Number(request.params.id)
  );
  response.json({ messages });
});

//Read only messages containing a substring in the text
app.get("/messages/search", function (request, response) {
  const searchText = request.query.text;

  if (!searchText) {
    return response.status(400).send("error");
  } else {
    const filteredMessages = messages.filter((message) => {
      return message.text.includes(searchText);
    });

    response.json({ messages: filteredMessages });
  }
});

// Read only the 10 recent messages

app.get("/messages/latest", function (request, response) {
  response.json({ messages: messages.slice(-10) });
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

 app.listen(port);
