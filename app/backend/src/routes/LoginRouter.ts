import { Request, Response, Router } from 'express';
import LoginController from '../Controller/LoginController';
import Validation from '../middlewares/Validations';
import ValidationToken from '../middlewares/validationToken';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  Validation.hasKey,
  Validation.isEmailValid,
  Validation.isPasswordValid,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  ValidationToken.verifyToken,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default router;
