"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOpenGames = exports.getGameStatus = void 0;
const Game_1 = require("../../models/Game");
const getGameStatus = async (req, res) => {
    try {
        const game = await Game_1.Game.findById(req.params.id);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            console.log('Game not found');
            return;
        }
        res.json(game);
        console.log(`Fetching game status for game ${game._id}`);
    }
    catch (error) {
        console.error('Error fetching game status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getGameStatus = getGameStatus;
const getAllOpenGames = async (req, res) => {
    try {
        const games = await Game_1.Game.find({ player2: null, isClosed: false });
        if (!games) {
            res.status(404).json({ message: "No games found" });
            console.log('Game not found');
            return;
        }
        res.json(games);
    }
    catch (error) {
        console.error('Error fetching open games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllOpenGames = getAllOpenGames;
