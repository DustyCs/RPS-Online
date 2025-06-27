"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGame = void 0;
const Game_1 = require("../../models/Game");
const joinGame = async (req, res) => {
    try {
        const { player2 } = req.body;
        const game = await Game_1.Game.findOne({ player2: null, isClosed: false });
        if (!game) {
            res.status(404).json({ error: 'No open games not found' });
            console.log('No open games not found');
            return;
        }
        const now = new Date();
        const game_created = new Date(game.createdAt);
        if (isNaN(game_created.getTime())) {
            res.status(500).json({ error: 'Invalid game creation date' });
            console.log('Invalid game creation date');
            return;
        }
        if (isNaN(now.getTime())) {
            res.status(500).json({ error: 'Invalid current date' });
            console.log('Invalid current date');
            return;
        }
        const game_age = (now.getTime() - game_created.getTime()) / (1000 * 60);
        if (game_age > 15) {
            game.isClosed = true;
            await game.save();
            res.status(404).json({ message: "Game has expired" });
            console.log('Game has expired');
            return;
        }
        game.player2 = player2;
        await game.save();
        res.status(201).json(game);
        console.log(`Joining game`, game);
        return;
    }
    catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
exports.joinGame = joinGame;
