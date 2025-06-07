import express from 'express';
import { createGame } from '../controllers/Game/create_game';
import { Game } from '../models/Game';
import { Router } from 'express';

const router: Router = express.Router();

router.post('/create', createGame);