"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameWinner = void 0;
const Game_1 = require("../../models/Game");
const gameWinner = async (req, res) => {
    try {
        const game = await Game_1.Game.findById(req.params.gameId);
        if (!game)
            res.status(404).json({ message: "Game not found" });
        res.json(game);
        return;
    }
    catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
exports.gameWinner = gameWinner;
