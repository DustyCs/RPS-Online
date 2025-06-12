import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app'; 
import { Game } from '../src/models/Game'; 

describe('RPS Game API', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Game.deleteMany();
  });

  it('should create a new game', async () => {
    const response = await request(app)
      .post('/api/game/create')
      .send({ player1: 'Alice' });

    console.log(typeof app);
    expect(response.status).toBe(201);
    expect(response.body.player1).toBe('Alice');
  });

  it('should allow a second player to join an existing game', async () => {
    const game = new Game({ player1: 'Alice' });
    await game.save();

    const response = await request(app)
      .post('/api/game/join')
      .send({ player2: 'Bob' });

    expect(response.status).toBe(201);
    expect(response.body.player2).toBe('Bob');
  });

  it('should allow a player to submit a move and determine the winner', async () => {
    const game = new Game({ player1: 'Alice', player2: 'Bob' });
    await game.save();

    await request(app).post('/api/game/move').send({ gameId: game._id, player: 'Alice', choice: 'rock' });
    const response = await request(app).post('/api/game/move').send({ gameId: game._id, player: 'Bob', choice: 'scissors' });

    expect(response.status).toBe(200);
    expect(response.body.winner).toBe('Alice');
  });

  it('should return 404 if game not found during move', async () => {
    const response = await request(app)
      .post('/api/game/move')
      .send({ gameId: '000000000000000000000000', player: 'Alice', choice: 'rock' });

    expect(response.status).toBe(404);
  });

  it('should return 403 if player is not part of the game', async () => {
    const game = new Game({ player1: 'Alice', player2: 'Bob' });
    await game.save();

    const response = await request(app)
      .post('/api/game/move')
      .send({ gameId: game._id, player: 'Eve', choice: 'rock' });

    expect(response.status).toBe(403);
  });
});
