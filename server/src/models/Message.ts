import sqlite from 'sqlite';

export default class Message {
  public static setDB(appDb: sqlite.Database) {
    this.db = appDb;
  }
  public static setSocketInstance(io: SocketIO.Server) {
    this.SocketInstance = io;
  }

  public static async get(id: string): Promise<Message> {
    return Promise.resolve(new Message('Hello, world!', 1));
  }
  public static async getAll(): Promise<Message[]> {
    return await Message.db.all(`SELECT * FROM Messages`);
  }

  private static SocketInstance: SocketIO.Server;
  private static db: sqlite.Database;

  public id: number;
  public message: string;
  public user: number;

constructor(message: string, user: number) {
    this.message = message;
    this.user = user;
  }

  public async save(): Promise<Message> {
    await Message.db.run('INSERT INTO Messages (message, user) VALUES(?, ?);', this.message, this.user);
    const rowid = await Message.db.get('SELECT last_insert_rowid();');
    this.id = parseInt(rowid['last_insert_rowid()'] as string, 10);
    Message.SocketInstance.sockets.emit('message', this);
    return this;
  }
}
