"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
const Game_1 = require("../../models/Game");
const createGame = async (req, res) => {
    try {
        const { player1, gameName } = req.body;
        if (!player1) {
            res.status(400).json({ error: 'A player is required.' });
            return;
        }
        const newGame = new Game_1.Game({
            player1,
            gameName: gameName || `Game-${Date.now()}`, // Default game name if not provided
        });
        await newGame.save();
        res.status(201).json(newGame);
        console.log(`Creating game`, newGame);
        return;
    }
    catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
exports.createGame = createGame;
