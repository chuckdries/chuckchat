export default class Message{
  message: string;
  user: string;

  constructor(message: string, user: string) {
    this.message = message;
    this.user = user;
  }

  public async save(): Promise<Message> {
    return Promise.resolve(this);
  }

  public static async LoadById(id: string): Promise<Message> {
    return Promise.resolve(new Message('Hello, world!', 'Chuck'));
  }
}
