import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app'; 
import { Game } from '../src/models/Game'; 

describe('GET api/game/:gameId', () => {
  let mongoServer: MongoMemoryServer;
  let gameId: string;

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

  it('should return 200 and the game data if found', async () => {
    const game = new Game({ player1: 'Alice' });
    await game.save();

    const res = await request(app).get(`/api/game/status/${game._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', `${game._id}`);
    expect(res.body).toHaveProperty('player1', 'Alice');
  });

  it('should return 404 if game not found', async () => {
    const game = new Game({ player1: 'Alice' });
    await game.save();
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/game/status/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Game not found');
  });

  it('should return 500 if an error occurs', async () => {
    const game = new Game({ player1: 'Alice' });
    await game.save();
    gameId = game._id.toString();
    const spy = jest.spyOn(Game, 'findById').mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    const res = await request(app).get(`/api/game/status/${gameId}`);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Internal server error');

    spy.mockRestore();
  });
});
