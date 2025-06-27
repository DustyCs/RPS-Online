"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const Game_1 = require("../src/models/Game");
describe('RPS Game API', () => {
    let mongoServer;
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
    it('should create a new game', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/game/create')
            .send({ player1: 'Alice' });
        console.log(typeof app_1.default);
        expect(response.status).toBe(201);
        expect(response.body.player1).toBe('Alice');
    });
    it('should allow a second player to join an existing game', async () => {
        const game = new Game_1.Game({ player1: 'Alice' });
        await game.save();
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/game/join')
            .send({ player2: 'Bob' });
        expect(response.status).toBe(201);
        expect(response.body.player2).toBe('Bob');
    });
    it('should allow a player to submit a move and determine the winner', async () => {
        const game = new Game_1.Game({ player1: 'Alice', player2: 'Bob' });
        await game.save();
        await (0, supertest_1.default)(app_1.default).post('/api/game/move').send({ gameId: game._id, player: 'Alice', choice: 'rock' });
        const response = await (0, supertest_1.default)(app_1.default).post('/api/game/move').send({ gameId: game._id, player: 'Bob', choice: 'scissors' });
        expect(response.status).toBe(200);
        expect(response.body.winner).toBe('Alice');
    });
    it('should return 404 if game not found during move', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/game/move')
            .send({ gameId: '000000000000000000000000', player: 'Alice', choice: 'rock' });
        expect(response.status).toBe(404);
    });
    it('should return 403 if player is not part of the game', async () => {
        const game = new Game_1.Game({ player1: 'Alice', player2: 'Bob' });
        await game.save();
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/game/move')
            .send({ gameId: game._id, player: 'Eve', choice: 'rock' });
        expect(response.status).toBe(403);
    });
});
