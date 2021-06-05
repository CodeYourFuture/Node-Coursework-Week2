const express = require("express");
const Joi = require("joi");
const cors = require("cors");
const { response, request } = require("express");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get("/messages", (request, response) => {
  response.send(messages);
});
app.get("/messages/search", (request, response) => {
  const searchQuery = request.query.text.toLocaleLowerCase();
  const filterMessages = messages.filter((element) => {
    return element.text.toLowerCase().includes(searchQuery);
  });
  response.send(filterMessages);
});

app.get("/messages/:id([0-9]+)", (request, response) => {
  const { id } = request.params;
  const message = messages.find((element) => {
    return element.id === parseInt(id);
  });
  response.send(message);
});

app.get("/messages/latest", (request, response) => {
  response.send(messages.slice(-10));
});

app.post("/messages", (request, response) => {
  const message = request.body;
  const date = new Date().toLocaleDateString();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  timeSent = `${hour}:${minutes}, ${date}`;
  message.timeSent = timeSent;
  message.id = messages.length + 1;

  const { error } = validateMessages(request.body);
  if (error) {
    response.status(400).send(error.details[0].message);
    return;
  } else {
    messages.push(message);
    response.send(messages);
  }

  // response.json(messages);
});

app.delete("/messages/:id", (request, response) => {
  const { id } = request.params;

  const message = messages.find((element) => element.id === parseInt(id));
  if (!message)
    return response.status(404).send("Message with given id was not found");

  messages.map((element) => {
    element.id === parseInt(id) ? messages.splice(id, 1) : null;
  });
  response.send(`You deleted the message with id, ${id}`);
});

app.put("/messages/:id", (request, response) => {
  const { id } = request.params;
  const message = messages.find((element) => element.id === parseInt(id));
  if (!message)
    response.status(404).send("message with given id was not found ");

  const schema = {
    from: Joi.string().min(3).required(),

    text: Joi.string().min(3).required(),
  };
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400).send(result.error.details[0].message);
    return;
  }

  message.text = request.body.text;
  message.from = request.body.from;
  response.send(message);
});

const validateMessages = (message) => {
  const schema = {
    from: Joi.string().min(3).required(),
    id: Joi.required(),
    text: Joi.string().min(3).required(),
    timeSent: Joi.required(),
  };

  return Joi.validate(message, schema);
};

// app.put("/messages/:id", (request, response) => {
//   const { id } = request.params;

//   const message = messages.find((element) => element.id === parseInt(id));
//   if (!message)
//     response.status(404).send("message with given id was not found ");

//   if (request.body.text && request.body.from) {
//     message.text = request.body.text;
//     message.from = request.body.from;
//     response.send(message);
//   } else {
//     response.sendStatus(400).send("Fill all the required fields!");
//   }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
