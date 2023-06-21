import { Request, Response, Router } from 'express';
import LeaderBoardController from '../Controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAway(req, res),
);

export default router;
