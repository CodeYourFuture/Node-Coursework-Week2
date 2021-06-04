const uuid = require("uuid"); //to create unique ID
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: uuid.v4(),
  from: "Murat",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};
const users = [
  {
    name: "murat",
    lastname: "demirtas",
    email: "muratdemirtas2001@gmail.com",
    password: "murat",
    isUserSignedIn: false,
  },
  {
    name: "askin",
    lastname: "ekinci",
    email: "askin2001@gmail.com",
    password: "murat",
    isUserSignedIn: false,
  },
  {
    name: "trainee",
    lasrname: "trainee",
    email: "trainee@gmail.com",
    password: "trainee",
    isUserSignedIn: false,
  },
];
let messages = [welcomeMessage];

//I used react front-end,don't need html file anymore
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });

//adding path for posting new messages
app.post("/", function (request, response) {
  const attemptedUser = users.filter((user) => {
    return user.email == request.body.email;
  });
  //checking whether user email and password match or not for signing in
  if (
    attemptedUser.length > 0 &&
    request.body.email === attemptedUser[0].email &&
    request.body.password === attemptedUser[0].password
  ) {
    attemptedUser.isUserSignedIn = true;
    response.send({ authentication: true, name: attemptedUser.name });
  } else {
    response.send({ authentication: false });
  }
});

//adding post path for user to sign up
app.post("/signup", function (request, response) {
  const newUser = request.body;
  if (
    request.body.firstName &&
    request.body.firstName != "" &&
    request.body.lastName &&
    request.body.lastName != "" &&
    request.body.email &&
    request.body.email != "" &&
    request.body.password &&
    request.body.password != ""
  ) {
    users.push(newUser);
    response.send({ registered: true });
  } else {
    response.status(404).send("enter signup info");
  }
});

//adding a get path to send messages to the user
app.get("/messages", function (request, response) {
  response.json(messages);
});


//adding a search path
app.get("/messages/search", function (request, response) {
  const text = request.query.text.toUpperCase();
  const messagesIncludingSearch = messages.filter((message) => {
    return message.text.toUpperCase().includes(text);
  });
  response.json(messagesIncludingSearch);
});


//adding a get path to send the last 10 messages to the user
app.get("/messages/latest", function (request, response) {
  if (messages.length > 10) {
    let lastTenMessages = messages.slice(-10, messages.length);
    response.json(lastTenMessages);
  } else response.json(messages);
});

//adding a get path to send message with an Id
app.get("/messages/:messageId", function (request, response) {
  const foundMessage = messages.filter((message) => {
    return message.id === parseInt(request.params.messageId);
  });
  response.json(foundMessage);
});

//adding a post path to add new messages to messages array
app.post("/messages", function (request, response) {
  if (
    !request.body.from ||
    request.body.from === "" ||
    !request.body.text ||
    request.body.text === ""
  ) {
    response
      .status(400)
      .send(
        "Bad Request-Please fill in the form and re-submit your message!!!"
      );
  } else {
    const newMessage = {
      id: uuid.v4(),
      from: request.body.from,
      text: request.body.text,
      timeSent: new Date(),
    };
    messages.push(newMessage);
    response.json(newMessage);
  }
});

//adding a put path to update a message
app.put("/messages/:messageId", function (request, response) {
  const id = request.params.messageId;
  let responseSent = false;
  messages.forEach((message) => {
    if (message.id == id) {
      responseSent = true;
      message.text = request.body.text;
      message.from = request.body.from;
      response.status(200).json(message);
    }
  });
  if (!responseSent) {
    response.status(404).send("Please check message id ");
  }
});


//adding a delete path to delete message with specified id
app.delete("/messages/:messageId", function (request, response) {
  messages = messages.filter((message) => {
    return message.id !== request.params.messageId;
  });
  response.json(messages);
});

app.listen(5000);
