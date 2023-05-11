const express = require("express");
const cors = require("cors");
const { request, response } = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Andriana",
  text: "Welcome to Andriana's Hub chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// POST MESSAGES IN JSON FORMAT
app.post("/messages", function (request, response) {
  const newWelcomeMessage = {
    // id: Math.floor(Math.random() * messages.length) + messages.length,
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date().toLocaleString(),
  };

  if (!newWelcomeMessage.from || !newWelcomeMessage.text) {
    return response
      .status(400)
      .json({ message: "Please include name and message" });
  }

  messages.push(newWelcomeMessage);
  response.json(messages);
  // response.redirect("/");
});

// GET ALL MESSAGES
app.get("/messages", function (request, response) {
  response.send(messages);
});

// SEARCH MESSAGES THAT CONTAIN SEARCH TERM
app.get("/messages/search", function (request, response) {
  const searchQuery = request.query.term;

  function searchedWord(arr) {
    return arr.filter((item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  response.send(searchedWord(messages));
});

// READ ONLY 10 RECENT MESSAGES
app.get("/messages/latest", function (request, response) {
  const latestMessages = [...messages.slice(-10)];
  response.send(latestMessages);
});

// FIND MESSAGES BY ID
app.get("/messages/:id", function (request, response) {
  const foundMessage = messages.find(
    (eachMessage) => eachMessage.id === parseInt(request.params.id)
  );

  foundMessage
    ? response.json(foundMessage)
    : response.status(400).json({ message: "Message not found" });
});

// DELETE MESSAGES BY ID
app.delete("/messages/:id", function (request, response) {
  const foundMessage = messages.indexOf(
    (eachMessage) => eachMessage.id === parseInt(request.params.id)
  );

  if (foundMessage) {
    messages = messages.filter(
      (eachMessage) => eachMessage.id !== parseInt(request.params.id)
    );
    response.json({
      message: `Message ${request.params.id} deleted`,
      messages: messages,
    });
  } else {
    response
      .status(400)
      .json({ message: `Message ${request.params.id} not found` });
  }
});

// UPDATE MESSAGES
app.put("/messages/:id", function (request, response) {
  const foundMessage = messages.findIndex(
    (eachMessage) => eachMessage.id === parseInt(request.params.id)
  );

  if (foundMessage) {
    const updateInfo = request.body;

    messages.forEach((eachMessage) => {
      if (eachMessage.id === parseInt(request.params.id)) {
        eachMessage.from =
          updateInfo.from === undefined ? updateInfo.from : eachMessage.from;
        eachMessage.text =
          updateInfo.text === undefined ? updateInfo.text : eachMessage.text;

        response.json({ msg: "Message updated", eachMessage });
      } else {
        response.status(400).json({ message: "Message not found" });
      }
    });
  }
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
