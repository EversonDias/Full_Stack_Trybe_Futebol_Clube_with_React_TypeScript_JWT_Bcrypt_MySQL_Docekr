import { Router } from 'express';
import teamRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import Validation from '../middlewares/Validations';
import roleRouter from './RoleRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use(
  '/login',
  Validation.hasEmail,
  Validation.isEmailValid,
  Validation.isPasswordValid,
  loginRouter,
);
router.use(
  '/role',
  roleRouter,
);

export default router;
