import MessageService from './MessageService';

describe('Message Service Class', () => {
  const messageService = new MessageService();
  it('Should initialize an object of MessageService class', () => {
    expect(messageService).toBeInstanceOf(MessageService);
  });

  it('Should return an array of messages', () => {
    const messages = messageService.getAll();
    expect(messages).toBeInstanceOf(Array);
  });

  const sampleMessage = {
    text: 'Hello',
    from: 'John',
    date: new Date(),
  };

  it('Should add a message and return it', () => {
    const message = messageService.add(sampleMessage);
    expect(message).toStrictEqual({
      ...sampleMessage,
      id: 0,
    });
  });

  it('Should return a message when requested by id', () => {
    const message = messageService.getById(0);
    expect(message).toStrictEqual({
      ...sampleMessage,
      id: 0,
    });
  });

  const newMessage = {
    text: 'Hello again',
    from: 'Jane',
  };
  it('Should edit a message and return it', () => {
    const message = messageService.edit(0, newMessage);
    expect(message.text).toStrictEqual(newMessage.text);
    expect(message.from).toStrictEqual(newMessage.from);

    const message2 = messageService.getById(0);
    expect(message2).not.toBeUndefined();
    if (!message2) {
      throw new Error('Message not found, but it should be there');
    }
    expect(message2.text).toStrictEqual(newMessage.text);
    expect(message2.from).toStrictEqual(newMessage.from);
  });

  it('Should delete a message', () => {
    messageService.delete(0);
    const message = messageService.getById(0);
    expect(message).toBeUndefined();
  });

  it('Should return an empty array when there are no messages', () => {
    expect(messageService.getAll()).toHaveLength(0);
  });

  it('Should add multiple messages when called multiple times', () => {
    messageService.add(sampleMessage);
    messageService.add(sampleMessage);
    messageService.add(sampleMessage);
    expect(messageService.getAll()).toHaveLength(3);
  });
});
