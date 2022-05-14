import { Request, Response } from 'express';
import TMessage from '../../types/message';
import MessageService from '../../utils/MessageService';

const Messages = new MessageService();

export function getMessages(_req: Request, res: Response): void {
  const messages = Messages.getAll();
  if (messages.length === 0) {
    res.status(404).send('No messages found');
  }
  res.send(messages);
}

export function getMessageById(req: Request, res: Response): void {
  const message:TMessage | undefined = Messages.getById(Number(req.params.id));
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
  const newMessage = Messages.add({
    text,
    from,
    date: new Date(),
  });

  res.send(newMessage);
}

export function editMessage(req: Request, res: Response): void {
  const { id } = req.params;
  const { text, from } = req.body;
  if (!text || !from) {
    res.status(400).send('Missing message text or from');
  }
  if (!Messages.getById(Number(id))) {
    res.status(404).send('Message not found');
  }
  Messages.edit(Number(id), {
    text,
    from,
  });
  res.send(Messages.getById(Number(id)));
}

export function deleteMessageById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (!Messages.getById(Number(id))) {
    res.status(404).send('Message not found');
  }
  Messages.delete(id);
  res.send(`Message with id ${id} deleted`);
}
