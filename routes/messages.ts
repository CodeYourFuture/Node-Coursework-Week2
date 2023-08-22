import express from 'express'
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getLatestMessages,
  getMessage,
  getSearchedMessages,
  updateMessage,
} from '../controllers/messages'
const router = express.Router()

router.route('/').get(getAllMessages).post(createMessage)
router.route('/latest').get(getLatestMessages)
router.route('/search').get(getSearchedMessages)
router
  .route('/:messagesId')
  .get(getMessage)
  .post(createMessage)
  .put(updateMessage)
  .delete(deleteMessage)

export default router
