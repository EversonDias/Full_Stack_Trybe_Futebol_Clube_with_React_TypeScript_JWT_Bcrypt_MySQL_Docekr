import { Request, Response } from 'express';
import MatchesService from '../Service/MatchesService';

export default class MatchesController {
  constructor(
    private matchService = new MatchesService(),
  ) {}

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (req.query.inProgress) {
      const { status, data } = await this.matchService
        .getFilterTeam({ query: 'inProgress', value: inProgress === 'true' });
      return res.status(status).json(data);
    }
    const { status, data } = await this.matchService.findAll();
    return res.status(status).json(data);
  };

  finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { status, data } = await this
      .matchService.update({ id: Number(id), key: 'inProgress', value: false });
    return res.status(status).json(data);
  };

  updateMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const resultHome = await this
      .matchService.update({ id: Number(id), key: 'homeTeamGoals', value: homeTeamGoals });
    await this.matchService.update({ id: Number(id), key: 'awayTeamGoals', value: awayTeamGoals });
    return res.status(resultHome.status).json({ message: 'Success' });
  };

  createMatch = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    const { status, data } = await this.matchService.create(body);
    return res.status(status).json(data);
  };
}
