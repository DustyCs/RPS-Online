"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const app_1 = __importDefault(require("../src/app"));
const Game_1 = require("../src/models/Game");
describe('GET api/game/:gameId', () => {
    let mongoServer;
    let gameId;
    beforeAll(async () => {
        mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose_1.default.connect(uri);
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
        await mongoServer.stop();
    });
    afterEach(async () => {
        await Game_1.Game.deleteMany();
    });
    it('should return 200 and the game data if found', async () => {
        const game = new Game_1.Game({ player1: 'Alice' });
        await game.save();
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/game/status/${game._id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id', `${game._id}`);
        expect(res.body).toHaveProperty('player1', 'Alice');
    });
    it('should return 404 if game not found', async () => {
        const game = new Game_1.Game({ player1: 'Alice' });
        await game.save();
        const fakeId = new mongoose_1.default.Types.ObjectId().toString();
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/game/status/${fakeId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Game not found');
    });
    it('should return 500 if an error occurs', async () => {
        const game = new Game_1.Game({ player1: 'Alice' });
        await game.save();
        gameId = game._id.toString();
        const spy = jest.spyOn(Game_1.Game, 'findById').mockImplementationOnce(() => {
            throw new Error('Unexpected error');
        });
        const res = await (0, supertest_1.default)(app_1.default).get(`/api/game/status/${gameId}`);
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal server error');
        spy.mockRestore();
    });
});
