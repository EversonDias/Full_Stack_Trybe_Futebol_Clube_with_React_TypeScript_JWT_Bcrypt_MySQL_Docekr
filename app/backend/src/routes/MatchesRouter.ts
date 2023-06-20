import { Request, Response, Router } from 'express';
import MatchesController from '../Controller/MatchesController';
import ValidationToken from '../middlewares/validationToken';
import Validation from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchesController.findAll(req, res));

router.patch('/:id/finish', ValidationToken.verifyToken, (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));

router.patch('/:id', ValidationToken.verifyToken, (req: Request, res:Response) =>
  matchesController.updateMatch(req, res));

router.post(
  '/',
  ValidationToken.verifyToken,
  Validation.isMatchEqual,
  Validation.isTeamExists,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
