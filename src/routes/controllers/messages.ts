import { Request, Response } from 'express';
import TMessage from '../../types/message';
import MessageService from '../../utils/MessageService';

export function getMessages(_req: Request, res: Response): void {
  const messages = MessageService.getAll();
  res.send(messages);
}

export function getMessageById(req: Request, res: Response): void {
  const message:TMessage | undefined = MessageService.getById(Number(req.params.id));
  if (message) {
    res.send(message);
  } else {
    res.status(404).send('Message not found');
  }
}

export function addMessage(req: Request, res: Response): void {
  const { text, from } = req.body;
  if (!text || !from) {
    res.status(400).send('Missing message or from');
  }
  const newMessage = MessageService.add({
    text,
    date: new Date(),
    from,
  });

  res.send(newMessage);
}

export function editMessage(req: Request, res: Response): void {
  const { id } = req.params;
  const { text, from } = req.body;
  if (!text || !from) {
    res.status(400).send('Missing message text or from');
  }
  if (!MessageService.getById(Number(id))) {
    res.status(404).send('Message not found');
  }
  MessageService.edit(Number(id), {
    text,
    from,
  });
}

export function deleteMessageById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  MessageService.delete(id);
  res.send(`Message with id ${id} deleted`);
}
