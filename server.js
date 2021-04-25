const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let counter = 1;
let selectedMessages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(selectedMessages);
});

app.get("/messages/search", function (request, response) {
  const newMessages = selectedMessages.filter((message) =>
    message.text.toLowerCase().includes(request.query.text.toLowerCase())
  );
  response.json(newMessages);
});

app.get("/messages/latest", function (request, response) {
  const newMessages = selectedMessages.slice(selectedMessages.length - 10);
  response.json(newMessages);
});

app.get("/messages/:id", function (request, response) {
  const newMessage = selectedMessages.filter(
    (message) => message.id === parseInt(request.params.id)
  );
  if (newMessage.length > 0) {
    response.json(newMessage);
  } else {
    response.status("404").json({ error: "Message not found" });
  }
});

app.post("/messages", function (request, response) {
  if (request.body.from && request.body.text) {
    const newMessage = {
      id: counter,
      from: request.body.from,
      text: request.body.text,
      timeSent: new Date(),
    };
    counter++;
    selectedMessages = [...selectedMessages, newMessage];
    response.status("201").json({ message: "message sent successfully." });
  } else {
    response.status("400").json({ error: "Invalid input" });
  }
});

app.put("/messages/:id", function (request, response) {
  const id = parseInt(request.params.id);
  const messageIndex = selectedMessages.findIndex((el) => el.id === id);

  if (messageIndex >= 0) {
    const updatedMessage = request.body;
    selectedMessages = selectedMessages.map((el) => {
      if (id === el.id) {
        return {
          ...el,
          from: updatedMessage.from || el.from,
          text: updatedMessage.text || el.text,
        };
      } else {
        return el;
      }
    });
    response.status("200").json({ message: "Item successfully updated" });
  } else {
    response.status("404").json({ message: "Message not found" });
  }
});

app.delete("/messages/:id", function (request, response) {
  selectedMessages = selectedMessages.filter(
    (el) => el.id !== parseInt(request.params.id)
  );
  response.status("200").json({ message: "Item successfully deleted" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
