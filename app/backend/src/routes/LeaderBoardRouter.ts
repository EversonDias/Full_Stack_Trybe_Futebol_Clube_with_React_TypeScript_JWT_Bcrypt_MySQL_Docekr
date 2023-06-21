import { Request, Response, Router } from 'express';
import LeaderBoardController from '../Controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHome(req, res),
);

export default router;
