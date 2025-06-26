import { Game } from '../models/Game';

const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const MAX_GAME_AGE_MINUTES = 15;

async function closeExpiredGames() {
  try {
    const cutoff = new Date(Date.now() - MAX_GAME_AGE_MINUTES * 60 * 1000);
    console.log(`Closing expired games older than ${MAX_GAME_AGE_MINUTES} minutes`);
    const result = await Game.updateMany(
      { isClosed: false, player2: null, createdAt: { $lt: cutoff } },
      { $set: { isClosed: true } }
    );

    if (result.modifiedCount > 0) {
      console.info(`Closed ${result.modifiedCount} expired game(s)`);
    }
  } catch (error) {
    console.error('Error closing expired games:', error);
  }
}

closeExpiredGames();

// Schedule the periodic job
setInterval(closeExpiredGames, CLEANUP_INTERVAL);
