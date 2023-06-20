import { Request, Response } from 'express';
import TeamService from '../Service/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  getAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const { status, data } = await this.teamService.getAll();
    res.status(status).json(data);
  };

  getId = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { status, data } = await this.teamService.getId(Number(id));
    res.status(status).json(data);
  };
}
