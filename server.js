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

app.get("/messages", function (request, response) {
  response.json(messages);
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
  const foundMessageId = messages.findIndex(
    (message) => message.id === delMessageId
  );

  if (foundMessageId < 0) {
    response.sendStatus(404);
    return;
  }

  messages.splice(foundMessageId, 1);
  response.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
