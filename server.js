const express = require("express");
const cors = require("cors");

const app = express();

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

<<<<<<< Updated upstream
app.listen(process.env.PORT);
=======
app.get("/messages", function (request, response) {
  response.json(messages);
});
app.get("/messages/latest", (request, response) => {
  const latestMessages = messages.slice(-10);
  if (messages.length > 0) {
    response.json(latestMessages);
  } else {
    response.status(400).json({ msg: `No messages to display` });
  }
});

app.get("/messages/search", (request, response) => {
  const { text } = request.query;
  let foundMessages = messages.filter((message) => message.text.includes(text));
  if (foundMessages.length > 0) {
    return response.json(foundMessages);
  } else {
    const notFoundErrorMessage = {
      msg: `Message with search key ${text} not found`,
    };
    response.json(notFoundErrorMessage);
  }
});

app.get("/messages/:id", (request, response) => {
  const found = messages.some(
    (message) => message.id === Number(request.params.id)
  );
  if (found) {
    response.json(
      messages.filter((message) => message.id === Number(request.params.id))
    );
  } else {
    response
      .status(400)
      .json({ msg: `Message with id of ${request.params.id} not found` });
  }
});

app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  const newMessage = {
    id: messages.length,
    from,
    text,
    timeStamp: new Date(),
  };
  if (from === undefined || from === "" || text === undefined || text === "") {
    const errorMessage = {
      msg: `you have bad input (or are missing the key) for ${
        (!from && !text) || (from === "" && text === "")
          ? "from and text"
          : !from || from === ""
          ? "from"
          : "text"
      }`,
    };
    return response.status(400).send(errorMessage);
  }
  messages.push(newMessage);
  response.json(messages);
});

app.put("/messages/:id", (req, res) => {
  const found = messages.some(
    (message) => message.id === Number(req.params.id)
  );
  if (found) {
    const updateMessage = req.body;
    messages.forEach((message) => {
      if (message.id === Number(req.params.id)) {
        message.from = updateMessage.from ? updateMessage.from : message.from;
        message.text = updateMessage.text ? updateMessage.text : message.text;

        res.json({ msg: "Message was updated", message });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Message with id of ${req.params.id} not found` });
  }
});

app.delete("/messages/:id", function (request, response) {
  const idOfMessageToDelete = Number(request.params.id);
  const foundID = messages.some(
    (message) => message.id === idOfMessageToDelete
  );
  if (foundID) {
    response.json({
      message: `Message deleted id ${idOfMessageToDelete}`,
      messages: messages.filter(
        (message) => message.id !== idOfMessageToDelete
      ),
    });
  } else {
    response
      .status(400)
      .send({ message: `Message with id of ${idOfMessageToDelete} not found` });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
>>>>>>> Stashed changes
