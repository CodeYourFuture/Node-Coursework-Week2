const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (request, response) => {
  if (!request.body.from || !request.body.text) {
    response.sendStatus(400);
    return;
  }
  const createdMessage = {
    id: Number(new Date()),
    from: request.body.from,
    text: request.body.text,
  };

  messages.push(createdMessage);
  console.log(createdMessage);
  response.status(201).json(createdMessage);
});

app.get("/messages", (request, response) => {
  response.json(messages);
});

app.get("/messages/search", (request, response) => {
  let foundMessages = messages;
  if (request.query.text) {
    foundMessages = foundMessages.filter(
      (message) =>
        message.text.toLowerCase().indexOf(request.query.text.toLowerCase()) >
        -1
    );
  }
    response.json(foundMessages);
});

app.get("/messages/latest", (request, response) => {
  let last10Messages = messages.slice(-10);
  if (last10Messages) {
    response.json(last10Messages);
  }
});

app.get("/messages/:id", (request, response) => {
  const foundMessage = messages.find(
    (message) => message.id === Number(request.params.id)
  );
  if (!foundMessage) {
    response.sendStatus(404);
    return;
  }
  response.json(foundMessage);
});

app.delete("/messages/:id", (request, response) => {
  const delMessageId = Number(request.params.id);
  const foundMessageIndex = messages.findIndex(
    (message) => message.id === delMessageId
  );
  if (foundMessageIndex < 0) {
    response.sendStatus(404);
    return;
  }
  messages.splice(foundMessageIndex, 1);
  response.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
