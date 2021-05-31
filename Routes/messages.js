const routes = require("express").Router();
const dbMessages = require("../database.json").messages;

routes.get("/", function (req, res) {
  res.status(200).json(dbMessages);
});

routes.post("/", function (req, res) {
  const newMessage = {
    id: parseInt(new Date().getTime() / 100).toString(16),
    from: req.body.from.trim(),
    text: req.body.text.trim(),
  };
  dbMessages.push(newMessage);
  res.status(200).json(dbMessages);
});

routes.get("/:id", function (req, res) {
  const indexSelected = dbMessages.findIndex(
    (message) => message.id == req.params.id
  );
  if (indexSelected >= 0) {
    res.status(200).json(db_messages[indexSelected]);
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
