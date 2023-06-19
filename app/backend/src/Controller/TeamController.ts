import { Request, Response } from 'express';
import TeamService from '../Service/TeamService';
import StatusHTTP from '../utils/StatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  getAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const { data } = await this.teamService.getAll();
    res.status(StatusHTTP.success).json(data);
  };

  getId = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const result = await this.teamService.getId(Number(id));
    if (result.data !== null) {
      res.status(StatusHTTP.success).json(result.data);
    }
    res.status(StatusHTTP.badRequest).json({ message: 'error' });
  };
}
