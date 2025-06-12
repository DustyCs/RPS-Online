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
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) return player1;
    return player2;
}

export const playerMove = async (req: Request, res: Response): Promise<void> => {
    const { gameId, player, choice } = req.body;

    const game = await Game.findById(gameId);
    if (!game)
        {
            res.status(404).json({ message: "Game not found" });
            return;
        }

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
        await game.save();
    }

    res.json(game);
}