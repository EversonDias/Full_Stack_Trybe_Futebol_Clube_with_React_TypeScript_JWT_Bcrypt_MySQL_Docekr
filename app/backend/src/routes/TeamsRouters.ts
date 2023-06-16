import { Request, Response, Router } from 'express';
import TeamController from '../Controller/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.getId(req, res));

export default router;
