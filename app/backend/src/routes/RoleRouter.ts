import { Request, Response, Router } from 'express';
import RoleController from '../Controller/RoleController';

const roleController = new RoleController();

const router = Router();

router.post('/', (req: Request, res: Response) => roleController.getRole(req, res));

export default router;
