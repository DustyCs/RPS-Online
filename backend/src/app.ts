import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './database'; // Ensure database connection is established
import { MainRouter } from './routes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use("/api", MainRouter);

export default app;