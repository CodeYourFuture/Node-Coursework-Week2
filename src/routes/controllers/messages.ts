import { Request, Response } from 'express';
import MessageService from '../../utils/MessageService';

export function getMessages(_req: Request, res: Response): void {
  const messages = MessageService.getAll();
  res.send(messages);
}

export function getMessageById(req: Request, res: Response): void {
  const message = MessageService.getById(Number(req.params.id));
  if (message) {
    res.send(message);
  } else {
    res.status(404).send('Message not found');
  }
}

export function addMessage(req: Request, res: Response): void {
  const { text, date, from } = req.body;
  if (!text || !from) {
    res.status(400).send('Missing message or from');
  }
  MessageService.add({
    text,
    date: date || new Date().toISOString(),
    from,
  })
    .then((msg) => {
      res.send(msg);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

export function deleteMessageById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  MessageService.delete(id);
  res.send(`Message with id ${id} deleted`);
}
