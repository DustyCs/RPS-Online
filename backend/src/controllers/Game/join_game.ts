import { Game } from "../../models/Game";
import { Request, Response } from "express";

export const joinGame = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { player2 } = req.body;

        const game = await Game.findOne({ player2: null });
        if (!game) {
            res.status(404).json({ error: 'No open games not found' });
            console.log('No open games not found');
            return 
        }

        game.player2 = player2;
        await game.save();
        res.status(201).json(game);
        console.log(`Joining game`, game);
        return;
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}