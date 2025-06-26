import { Game } from '../../models/Game';
import { Request, Response } from 'express';

/**
 * Determines the winner of a Rock-Paper-Scissors game.
 * @param {string} choice1 - The choice of player 1.
 * @param {string} choice2 - The choice of player 2.
 * @param {string} player1 - The name of player 1.
 * @param {string} player2 - The name of player 2.
 * @returns {string} - Returns 'draw' if it's a draw, otherwise returns the name of the winning player.
 */

function determineWinner(choice1: string, choice2: string, player1: string, player2: string): string {
    if (choice1 === choice2) return 'draw';
    if (
        (choice1 === 'Rock' && choice2 === 'Scissors') ||
        (choice1 === 'Paper' && choice2 === 'Rock') || // this should have been non case sensitive and should have been handled properly... same in the model
        (choice1 === 'Scissors' && choice2 === 'Paper')
    ) return player1;
    return player2;
}

export const playerMove = async (req: Request, res: Response): Promise<void> => {

    try{
        const { gameId, player, choice } = req.body;

        const game = await Game.findById(gameId);
        if (!game)
            {
                res.status(404).json({ message: "Game not found" });
                return;
            }

        console.log("Player move:", player, choice);

        if (game.player1 === player) {
            game.player1_choice = choice
        }
        else if (game.player2 === player) {
            game.player2_choice = choice
        }
        else {
            res.status(403).json({ message: "You are not part of this game" });
            return;
        }   
        await game.save();

        // Check if both players have played
        if (game.player1_choice && game.player2_choice && game.player1 && game.player2) {
            game.winner = determineWinner(game.player1_choice, game.player2_choice, game.player1, game.player2);
            game.isClosed = true; // close game
            console.log("Winner:", game.winner);
            await game.save();
        }

        res.json(game);
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const closeGameOnLeave = async (req: Request, res: Response) => {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);

    if (!game) return;

    game.isClosed = true;
    await game.save();
    res.status(200).json({ message: "Game closed" });
}