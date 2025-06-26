import express from 'express';
import { createGame} from '../controllers/Game/create_game';
import { joinGame } from '../controllers/Game/join_game';
import { playerMove } from '../controllers/Game/player_move';
import { gameWinner } from '../controllers/Game/game_winner';
import { getAllOpenGames, getGameStatus } from '../controllers/Game/get_game';
import { Router } from 'express';

const router: Router = express.Router();

router.post('/create', createGame);
router.post('/join', joinGame);

router.post('/move', playerMove);
router.post('/close', playerMove);

router.get('/winner', gameWinner);
router.get('/games', getAllOpenGames);
router.get('/status/:id', getGameStatus);

export const GameRouter: Router = router;

// next time you see this error:
// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'Application<Record<string, any>>'.
//       Type '(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<...>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.ts(2769)

// Check for return statements
// Add promise <void>
// make sure to return; at the end without anything else