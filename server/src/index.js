import express from 'express';
import http from 'http';
import socketio from 'socket.io';
// import cors from 'cors';

const app = express();
const httpServer = http.Server(app);
const io = socketio(httpServer);

// const corsOptions = {
//   credentials: true,
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

io.on('connection', (socket) => {
  console.log('a user connected'); // eslint-disable-line no-console
  socket.on('message', message => io.sockets.emit('message', message));
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line no-console
  });
});

app.get('/', (req, res) => {
  res.send('howdy!');
});

httpServer.listen(8080, () => console.log('Listening on 8080')); // eslint-disable-line no-console
