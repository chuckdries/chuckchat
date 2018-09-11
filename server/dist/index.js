"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const socket_io_1 = __importDefault(require("socket.io"));
const sqlite_1 = __importDefault(require("sqlite"));
const config_1 = __importDefault(require("./config"));
const Message_1 = __importDefault(require("./models/Message"));
const app = express_1.default();
const httpServer = http_1.createServer(app);
const io = socket_io_1.default(httpServer);
let db;
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors_1.default(corsOptions));
const setupServer = () => {
    httpServer.listen(8080, () => console.log('Listening on 8080')); // tslint:disable-line:no-console
};
const setupSocket = () => {
    Message_1.default.setSocketInstance(io);
    io.on('connection', (socket) => {
        console.log('a user connected'); // tslint:disable-line:no-console
        socket.on('message', (message, fn) => {
            // io.sockets.emit('message', message);
            new Message_1.default(message.message, 1).save();
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
    app.get('/', (req, res) => {
        // res.send('hello!');
        res.redirect(config_1.default.clientURL);
    });
    app.get('/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.json(yield Message_1.default.getAll());
    }));
    setupSocket();
};
const setupModels = () => __awaiter(this, void 0, void 0, function* () {
    const dbPromise = sqlite_1.default.open(path_1.default.resolve('./', './data.db'));
    db = yield dbPromise;
    if (yield db.get(`SELECT name FROM sqlite_master WHERE name='Users'`)) {
        console.log('Users table exists'); // tslint:disable-line:no-console
    }
    if (yield db.get(`SELECT name FROM sqlite_master WHERE name='Messages'`)) {
        console.log('Messages table exists'); // tslint:disable-line:no-console
    }
    Message_1.default.setDB(db);
    setupRoutes();
});
setupModels();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUN4QixzREFBOEI7QUFDOUIsK0JBQW9DO0FBRXBDLGdEQUF3QjtBQUN4QiwwREFBaUM7QUFDakMsb0RBQTRCO0FBRzVCLHNEQUE4QjtBQUM5QiwrREFBdUM7QUFFdkMsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLG1CQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsTUFBTSxFQUFFLEdBQUcsbUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoQyxJQUFJLEVBQW1CLENBQUM7QUFFeEIsTUFBTSxXQUFXLEdBQUc7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixvQkFBb0IsRUFBRSxHQUFHO0NBQzFCLENBQUM7QUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUN2QixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztBQUNwRyxDQUFDLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDdkIsaUJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztRQUNsRSxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNuQyx1Q0FBdUM7WUFDdkMsSUFBSSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkMsRUFBRSxFQUFFLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFdBQVcsRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUN2QixXQUFXO0lBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQ1QsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDWCxzQkFBc0I7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FDRixDQUFDO0lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0gsV0FBVyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsR0FBUyxFQUFFO0lBQzdCLE1BQU0sU0FBUyxHQUFHLGdCQUFNLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDL0QsRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDO0lBQ3JCLElBQUksTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLEVBQUU7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO0tBQ3JFO0lBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsRUFBRTtRQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7S0FDeEU7SUFDRCxpQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQixXQUFXLEVBQUUsQ0FBQztBQUNoQixDQUFDLENBQUEsQ0FBQztBQUVGLFdBQVcsRUFBRSxDQUFDIn0=