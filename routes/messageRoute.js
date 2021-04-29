const express = require("express");

const router = express.Router();

router
  .route("")
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

router
  .router("/:id")
  .get(messageController.getMessage)
  .delete(messageController.deleteMessage);
