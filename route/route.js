const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getOneMessage,
  getLatestMessages,
  creatMessage,
  searchAllMessages,
  searchAllByName,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

// /messages is comming from main route //
// @desc = get and post messages
router.route("/").get(getAllMessages).post(creatMessage);
// @desc = /search get searched messages //
router.route("/search").get(searchAllMessages);

// @desc = /search/name get searched messages by name
router.route("/search/name").get(searchAllByName);

// @desc = /latest get latest messages
router.route("/latest").get(getLatestMessages);

// @desc = /:id  get, put and delete messages by id;
router.route("/:id").get(getOneMessage).put(updateMessage).delete(deleteMessage);

module.exports = router;
