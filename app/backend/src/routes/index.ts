import { Router } from 'express';
import teamRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import matchesRouter from './MatchesRouter';
import Validation from '../middlewares/Validations';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login/role', loginRouter);
router.use(
  '/login',
  Validation.hasEmail,
  Validation.isEmailValid,
  Validation.isPasswordValid,
  loginRouter,
);
router.use('/matches', matchesRouter);

export default router;
