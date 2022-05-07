import { promises as fs } from 'fs';
import logger from './logger';

const MESSAGES_PATH = `${__dirname}/../data/messages.json`;

type TMessage = {
  id?: number;
  message: string;
  date: string;
  from: string;
};

async function readMessagesFromFile(): Promise<TMessage[]> {
  let messages: TMessage[] = [];
  try {
    const data = await fs.readFile(MESSAGES_PATH, 'utf8');
    messages = JSON.parse(data);
  } catch (error) {
    await fs.writeFile(MESSAGES_PATH, '[]');
    logger.error(error);
  }
  return messages;
}

class MessageService {
  data: TMessage[];

  constructor() {
    Promise.resolve(readMessagesFromFile())
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  getAll(): TMessage[] {
    return this.data.map((message, i) => ({
      ...message,
      id: i,
    }));
  }

  getById(id: number): TMessage | undefined {
    const message = this.data[id];
    if (!message) {
      return undefined;
    }
    return {
      ...message,
      id,
    };
  }

  async add(message: TMessage): Promise<TMessage> {
    this.data.push(message);
    if (this.data.length > 100) {
      this.data = this.data.slice(-100);
    }
    try {
      await fs.writeFile(MESSAGES_PATH, JSON.stringify(this.data));
    } catch (error) {
      logger.error(error);
    }
    return {
      ...message,
      id: this.data.length - 1,
    };
  }

  async delete(id: number): Promise<void> {
    this.data = this.data.filter((_msg: TMessage, i: number) => i !== id);
    try {
      await fs.writeFile(MESSAGES_PATH, JSON.stringify(this.data));
    } catch (error) {
      logger.error(error);
    }
  }
}

export default new MessageService();
