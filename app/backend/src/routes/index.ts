import { Router } from 'express';
import teamRouter from './TeamsRouters';
import loginRouter from './LoginRouter';
import Validation from '../middlewares/Validations';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  Validation.hasEmail,
  Validation.isEmailValid,
  Validation.isPasswordValid,
  loginRouter,
);

export default router;
