import TMessage from 'src/types/message';

class MessageService {
  data: TMessage[];

  constructor() {
    this.data = [];
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

  add(message: TMessage): TMessage {
    this.data.push(message);
    if (this.data.length > 100) {
      this.data = this.data.slice(-100);
    }
    return {
      ...message,
      id: this.data.length - 1,
    };
  }

  delete(id: number): void {
    this.data = this.data.filter((_msg: TMessage, i: number) => i !== id);
  }

  edit(id: number, msg: { text: string; from: string }): TMessage {
    this.data[id] = {
      ...this.data[id],
      ...msg,
    };
    return this.data[id];
  }
}

export default new MessageService();
