const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});

let messages = require("./messages.json")

//  get the index file
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// get /READ  all the messages
app.get("/messages", function (request, response) {
  response.status(200).json({ messages });
});

//  get / read a messsage by a specific ID

app.get("/messages/:id", function (request, response) {
  const found = messages.filter(
    (eachmessage) => eachmessage.id === parseInt(request.params.id)
  );

  console.log(found);

  if (found) {
    response
      .status(200)
      .json(
        messages.filter(
          (eachmessage) => eachmessage.id === parseInt(request.params.id)
        )
      );
  } else {
    response.status(400).json({
      message: `No message with the id of ${request.params.albumId}`,
    });
  }
});

//  - [ ] Create a new message /POST
app.post("/messages/createNewMessage", function (request, response) {
  const createNewMessage = {
    id: request.body.id,
    from: request.body.from,
    text: request.body.text,
  };
  if (
    createNewMessage.id === "" ||
    createNewMessage.from === "" ||
    createNewMessage.text === ""
  ) {
    return response.status(404).json({
      message: `Please include a message ID, from who the message is sent & the text`,
    });
  } else {
    messages.push(createNewMessage);
    response.status(200).json(messages);
  }
});

// - [ ] Delete a message, by ID

app.delete("/messages/:id", function (request, response) {
  const found = messages.filter(
    (eachmessage) => eachmessage.id === parseInt(request.params.id)
  );

  if (found) {
    response.status(200).json({
      message: `DELETED  the message with the id of ${request.params.id}`,
      messages: messages.filter(
        (eachmessage) => eachmessage.id !== parseInt(request.params.id)
      ),
    });
  } else {
    response.status(400).json({
      message: `No message with the id of ${request.params.albumId}`,
    });
  }
});

// chalalnge level 03

// - [ ] Read _only_ messages whose text contains a given substring: `/messages/search?text=express`

app.get("/search", (request, response) => {

  // console.log(request.params.text)
  // response.send(messages)

  console.log(request.query)
  const word = request.query.word.toLowerCase();
  // console.log(word);

  const filteredWord = messages.filter((eachmessage) =>
    eachmessage.text.toLowerCase().includes(word)
  );

  response.json(filteredWord);
  // console.log(filteredWord);
});
// - [ ] Read only the most recent 10 messages: `/messages/latest`

app.get("/latest", function (request, response) {
  const recentMessages = messages.slice(-10);
  response.send(recentMessages);
  // console.log(recentMessages);
});
