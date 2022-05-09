const express = require("express");
const router = express.Router();
const messagesData = require("../data");

router.get("/", function (request, response) {
  response.json(messagesData);
});

module.exports = router;
