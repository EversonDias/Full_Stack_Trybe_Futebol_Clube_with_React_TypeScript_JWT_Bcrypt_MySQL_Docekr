import { Request, Response, Router } from 'express';
import MatchesController from '../Controller/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

export default router;
