import { Game } from '../../models/Game';
import { Request, Response } from 'express';

export const gameWinner = async (req: Request, res: Response): Promise<void> => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) res.status(404).json({ message: "Game not found" });
        res.json(game);
        return;
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

