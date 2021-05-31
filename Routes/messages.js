const routes = require("express").Router();
const lodash = require("lodash");
const dbMessages = require("../database.json").messages;

routes.get("/", function (req, res) {
  res.status(200).json(dbMessages);
});

routes.post("/", function (req, res) {
  const newMessage = {
    id: lodash.uniqueId(),
    from: req.body.from.trim(),
    text: req.body.text.trim(),
    timeSent: new Date(),
  };

  if (!newMessage.from || !newMessage.text) {
    res.status(422).json({ msg: "Enter valid name or text" });
  } else {
    dbMessages.push(newMessage);
    res.status(200).json(dbMessages);
  }
});

routes.get("/latest", function (req, res) {
  const latestMessages = dbMessages.slice(-10);
  res.status(200).json(latestMessages);
});

routes.get("/search", function (req, res) {
  const searchText = req.query.text;
  const searchResult = dbMessages.filter((message) =>
    message.text.includes(searchText)
  );
  res.send(searchResult);
});

routes.get("/:id", function (req, res) {
  const indexSelected = dbMessages.findIndex(
    (message) => message.id == req.params.id
  );

  if (indexSelected >= 0) {
    res.status(200).json(dbMessages[indexSelected]);
  } else {
    res.status(501).send("The message was not found");
  }
});

routes.put("/:id", function (req, res) {
  const updateIndex = dbMessages.findIndex(
    (message) => message.id == req.params.id
  );
  if (updateIndex >= 0) {
    const updateFrom = req.body.from.trim();
    const updateText = req.body.text.trim();
    if (updateFrom || updateText) {
      dbMessages[updateIndex].from = updateFrom;
      dbMessages[updateIndex].text = updateText;
      res.status(204).json({ message: "Updated" });
    } else {
      res.status(501).send("Please send valid from or text");
    }
  } else {
    res.status(501).send("The message was not found");
  }
});

routes.delete("/:id", function (req, res) {
  const indexDelete = dbMessages.findIndex(
    (message) => message.id == req.params.id
  );
  if (indexDelete >= 0) {
    dbMessages.splice(indexDelete, 1);
    res.status(204).json(dbMessages);
  } else {
    res.status(501).send("The message was not found");
  }
});

module.exports = routes;
