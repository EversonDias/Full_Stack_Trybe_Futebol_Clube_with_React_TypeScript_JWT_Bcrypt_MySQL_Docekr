import { Request, Response } from 'express';
import MatchesService from '../Service/MatchesService';
import StatusHTTP from '../utils/StatusHTTP';

export default class MatchesController {
  constructor(
    private matchService = new MatchesService(),
  ) {}

  findAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.matchService.findAll();
    if (result.status === 'SUCCESS') {
      return res.status(StatusHTTP.success).json(result.data);
    }
    return res.status(StatusHTTP.badRequest).json(result.data);
  };
}
