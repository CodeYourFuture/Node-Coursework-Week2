const express = require("express");
// const uuid = require("uuid");
const cors = require("cors");
const path = require("path");
const logger = require("./middleware/logger.js");

const app = express();

app.use(cors());

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// get a single message
app.get("/messages/:id", (req, res) => {
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      messages.filter((message) => message.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }
});

// get all messages
app.get("/messages", function (request, response) {
  response.send(messages);
});

// add/create messages
app.post("/messages", function (request, response) {
  const newMessage = {
    // id: uuid.v4(), //==> random id generator <==
    id: messages.length + 1,
    from: request.body.from,
    text: request.body.text,
    status: "active",
  };

  if (!newMessage.from || !newMessage.text) {
    response.status(400).json({ msg: "Please include a name and a text" });
  }

  messages.push(newMessage);
  response.json(messages);
});

// update message
app.put("/messages/:id", (req, res) => {
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );

  if (found) {
    const updateMessage = req.body;
    messages.forEach((message) => {
      if (message.id === parseInt(req.params.id)) {
        messages.from = updateMessage.from ? updateMessage.from : message.from;
        message.text = updateMessage.text ? updateMessage.text : message.text;

        res.json({ msg: "Message updated", message });
      }
    });
  } else {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }
});

// Delete message
app.delete("/messages/:id", (req, res) => {
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );

  if (found) {
    res.json({
      msg: "Message deleted",
      messages: messages.filter(
        (message) => message.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No message with the id of ${req.params.id}` });
  }
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
