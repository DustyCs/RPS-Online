import { Router } from 'express';
import { GameRouter } from './game';

const router: Router = Router();

router.use('/game', GameRouter);


export const MainRouter : Router = router;