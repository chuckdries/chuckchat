"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
// import cors from 'cors';
const app = express_1.default();
const httpServer = http_1.createServer(app);
const io = socket_io_1.default(httpServer);
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
//# sourceMappingURL=index.js.map