
export const createGame = async (req, res) => {
    try {
        const { player1, player2 } = req.body;

        if (!player1 || !player2) {
            return res.status(400).json({ error: 'Both players are required.' });
        }

        const newGame = new Game({
            player1,
            player2,
            player1_choice: null,
            player2_choice: null,
            winner: null
        });

        await newGame.save();

        return res.status(201).json(newGame);
    } catch (error) {
        console.error('Error creating game:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}