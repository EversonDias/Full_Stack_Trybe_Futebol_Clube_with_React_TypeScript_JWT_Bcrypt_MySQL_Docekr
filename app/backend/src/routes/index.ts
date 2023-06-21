import { Router } from 'express';
import teamRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import matchesRouter from './MatchesRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  loginRouter,
);
router.use('/matches', matchesRouter);

export default router;
