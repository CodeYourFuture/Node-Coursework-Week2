const express = require("express");
const messageController = require("../controllers/messageControler");

const router = express.Router();

router
  .route("")
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

router.route("/search").get(messageController.searchMessages);

router
  .route("/:id")
  .get(messageController.getMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
