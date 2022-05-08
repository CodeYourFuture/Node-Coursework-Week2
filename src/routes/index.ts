import { Router } from 'express';
import {
  addMessage, deleteMessageById, editMessage, getMessageById, getMessages,
} from './controllers/messages';
import welcome from './controllers/welcome';

const routes:Router = Router();

routes.get('/', welcome)
  .get('/messages', getMessages)
  .get('/messages/:id', getMessageById)
  .post('/messages', addMessage)
  .delete('/messages/:id', deleteMessageById)
  .put('/messages/:id', editMessage);

export default routes;
