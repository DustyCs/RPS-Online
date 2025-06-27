"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cleanShutdown = async () => {
    console.log('Mongoose default connection disconnected through app termination');
    await mongoose_1.default.connection.close();
    process.exit(0);
};
const db_connect = (URI, options) => {
    mongoose_1.default.connect(URI, options)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.error("MongoDB Connection Error:", err));
    mongoose_1.default.connection.on('connected', () => {
        console.log('Mongoose successfully connected to MongoDB');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.error('Mongoose error:', err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.warn('Mongoose disconnected');
    });
    process.on('SIGINT', cleanShutdown);
    process.on('SIGTERM', cleanShutdown);
};
exports.default = db_connect;
