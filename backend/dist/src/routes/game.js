"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRouter = void 0;
const express_1 = __importDefault(require("express"));
const create_game_1 = require("../controllers/Game/create_game");
const join_game_1 = require("../controllers/Game/join_game");
const player_move_1 = require("../controllers/Game/player_move");
const game_winner_1 = require("../controllers/Game/game_winner");
const get_game_1 = require("../controllers/Game/get_game");
const router = express_1.default.Router();
router.post('/create', create_game_1.createGame);
router.post('/join', join_game_1.joinGame);
router.post('/move', player_move_1.playerMove);
router.post('/close', player_move_1.playerMove);
router.get('/winner', game_winner_1.gameWinner);
router.get('/games', get_game_1.getAllOpenGames);
router.get('/status/:id', get_game_1.getGameStatus);
exports.GameRouter = router;
// next time you see this error:
// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type '(req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>' is not assignable to parameter of type 'Application<Record<string, any>>'.
//       Type '(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => Promise<...>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.ts(2769)
// Check for return statements
// Add promise <void>
// make sure to return; at the end without anything else
