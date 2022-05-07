type TMessage = {
  id?: number;
  message: string;
  date: string;
  from: string;
};
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

  async add(message: TMessage): Promise<TMessage> {
    this.data.push(message);
    if (this.data.length > 100) {
      this.data = this.data.slice(-100);
    }
    return {
      ...message,
      id: this.data.length - 1,
    };
  }

  async delete(id: number): Promise<void> {
    this.data = this.data.filter((_msg: TMessage, i: number) => i !== id);
  }
}

export default new MessageService();
