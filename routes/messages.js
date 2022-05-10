const express = require("express");
const router = express.Router();
const messagesData = require("../data");

router.get("/", function (request, response) {
  response.json(messagesData);
});

router.get("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let filteredMessage = messagesData.find((el) => el.id === id);
  if (!filteredMessage) {
    res.status(400).send("User not found for given id");
  }
  response.json(filteredMessage);
});

router.post("/", function (request, response) {
  let newMessage = {
    id: messagesData[messagesData.length - 1].id + 1,
    from: request.body.from,
    text: request.body.text,
  };

  if (!newMessage.from || !newMessage.text) {
    response.status(400).send("Message not found for given id");
  }
  messagesData.push(newMessage);
  response.json(messagesData);
});

router.delete("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let deletedMessage = messagesData.find((el) => el.id === id);
  if (deletedMessage) {
    messagesData = messagesData.filter(
      (message) => message.id !== parseInt(req.params.id)
    );

    response.json({
      msg: "User deleted",

      messagesData,
    });
  } else {
    response.status(400).send("Message not existing given id");
  }
});

router.put("/:id", function (request, response) {
  let id = parseInt(request.params.id);
  let foundMessage = messagesData.find((el) => el.id === id);
  if (foundMessage) {
    messagesData.forEach((message) => {
      if (message.id === parseInt(request.params.id)) {
        foundMessage.from = request.body.from
          ? updateMessage.from
          : foundMessage.from;

        foundMessage.text = request.body.text
          ? updateMessage.text
          : foundMessage.text;

        response.json({ msg: "message updated", message });
      }
    });
  } else {
    response.sendStatus(400);
  }
});

module.exports = router;
