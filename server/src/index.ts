import express from 'express';
import { createServer } from 'http';
import socketio from 'socket.io';
// import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = socketio(httpServer);

// const corsOptions = {
//   credentials: true,
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

io.on('connection', (socket) => {
  console.log('a user connected'); // tslint:disable-line:no-console
  socket.on('message', (message, fn) => {
    io.sockets.emit('message', message);
    fn();
  });
  socket.on('disconnect', () => {
    console.log('user disconnected'); // tslint:disable-line:no-console
  });
});

app.get('/', (req, res) => {
  res.send('howdy!');
});

httpServer.listen(8080, () => console.log('Listening on 8080')); // tslint:disable-line:no-console
