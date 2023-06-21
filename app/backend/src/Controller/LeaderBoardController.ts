import { Request, Response } from 'express';
import LeaderBoardService from '../Service/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  getHome = async (_req: Request, res: Response) => {
    const { status, data } = await this.leaderBoardService.getHome();
    res.status(status).json(data);
  };
}
