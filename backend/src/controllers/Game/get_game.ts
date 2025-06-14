import { Game } from "../../models/Game";
import { Request, Response } from "express";
export const getGameStatus = async (req: Request, res: Response) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }

        res.json(game);
    } catch (error) {
        console.error('Error fetching game status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}