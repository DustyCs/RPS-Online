import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import './database'; // Initialize database connection
import './utils/close_games'; // Schedule cleanup job
import { MainRouter } from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

console.log("Server started... trying to run")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ['https://rockpaperscissors-online.web.app', 'http://localhost:5173'],
    credentials: true
}));

app.use("/api", MainRouter);

export default app;