import { Router } from 'express';
import teamRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import matchesRouter from './MatchesRouter';
import leaderBoardRouter from './LeaderBoardRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  loginRouter,
);
router.use('/matches', matchesRouter);

router.use('/leaderboard', leaderBoardRouter);

export default router;
