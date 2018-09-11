"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    static setDB(appDb) {
        this.db = appDb;
    }
    static setSocketInstance(io) {
        this.SocketInstance = io;
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(new Message('Hello, world!', 1));
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Message.db.all(`SELECT * FROM Messages`);
        });
    }
    constructor(message, user) {
        this.message = message;
        this.user = user;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Message.db.run('INSERT INTO Messages (message, user) VALUES(?, ?);', this.message, this.user);
            const rowid = yield Message.db.get('SELECT last_insert_rowid();');
            this.id = parseInt(rowid['last_insert_rowid()'], 10);
            Message.SocketInstance.sockets.emit('message', this);
            return this;
        });
    }
}
exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsTUFBcUIsT0FBTztJQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQXNCO1FBQ3hDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLENBQUM7SUFDTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBbUI7UUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBTyxHQUFHLENBQUMsRUFBVTs7WUFDaEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxNQUFNOztZQUN4QixPQUFPLE1BQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFTSCxZQUFZLE9BQWUsRUFBRSxJQUFZO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFWSxJQUFJOztZQUNmLE1BQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEcsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQWxDRCwwQkFrQ0MifQ==