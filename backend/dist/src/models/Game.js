"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gameSchema = new mongoose_1.default.Schema({
    gameName: { type: String, unique: true },
    player1: { type: String, required: true },
    player2: { type: String },
    player1_choice: { type: String, enum: ['Rock', 'Raper', 'Scissors', null], default: null },
    player2_choice: { type: String, enum: ['Rock', 'Paper', 'Scissors', null], default: null },
    winner: { type: String, default: null },
    isClosed: { type: Boolean, default: false },
}, { timestamps: true });
exports.Game = mongoose_1.default.model('Game', gameSchema);
