import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import passport from 'passport';
import path from 'path';
import socketio from 'socket.io';
import sqlite from 'sqlite';
import urljoin from 'url-join';

import config from './config';
import Message from './models/Message';

const app = express();
const httpServer = createServer(app);
const io = socketio(httpServer);
let db: sqlite.Database;

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const setupServer = () => {
  httpServer.listen(8080, () => console.log('Listening on 8080')); // tslint:disable-line:no-console
};

const setupSocket = () => {
  Message.setSocketInstance(io);
  io.on('connection', (socket) => {
    console.log('a user connected'); // tslint:disable-line:no-console
    socket.on('message', (message, fn) => {
      // io.sockets.emit('message', message);
      new Message(message.message, 1).save();
      fn();
    });
    socket.on('disconnect', () => {
      console.log('user disconnected'); // tslint:disable-line:no-console
    });
  });
  setupServer();
};

const setupRoutes = () => {
  // do stuff
  app.get('/',
    (req, res) => {
      // res.send('hello!');
      res.redirect(config.clientURL);
    },
  );
  app.get('/messages', async (req, res) => {
    res.json(await Message.getAll());
  });
  setupSocket();
};

const setupModels = async () => {
  const dbPromise = sqlite.open(path.resolve('./', './data.db'));
  db = await dbPromise;
  if (await db.get(`SELECT name FROM sqlite_master WHERE name='Users'`)) {
    console.log('Users table exists'); // tslint:disable-line:no-console
  }
  if (await db.get(`SELECT name FROM sqlite_master WHERE name='Messages'`)) {
    console.log('Messages table exists'); // tslint:disable-line:no-console
  }
  Message.setDB(db);
  setupRoutes();
};

setupModels();
