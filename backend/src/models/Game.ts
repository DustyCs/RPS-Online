import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    gameName: { type: String, unique: true },
    player1: { type: String, required: true },
    player2: { type: String },
    player1_choice: { type: String, enum: ['rock', 'paper', 'scissors', null], default: null},
    player2_choice: { type: String, enum: ['rock', 'paper', 'scissors', null], default: null},
    winner: { type: String, default: null },
}, { timestamps: true });

export const Game = mongoose.model('Game', gameSchema);