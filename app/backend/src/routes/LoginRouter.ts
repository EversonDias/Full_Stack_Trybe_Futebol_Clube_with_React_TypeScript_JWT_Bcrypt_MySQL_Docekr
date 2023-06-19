import { Request, Response, Router } from 'express';
import LoginController from '../Controller/LoginController';

const loginController = new LoginController();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get('/', (req: Request, res: Response) => loginController.getRole(req, res));

export default router;
