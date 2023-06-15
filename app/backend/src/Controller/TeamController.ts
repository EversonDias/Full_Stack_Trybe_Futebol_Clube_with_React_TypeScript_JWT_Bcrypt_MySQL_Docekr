import { Request, Response } from 'express';
import TeamService from '../Service/TeamService';

const getAll = async (_req: Request, res: Response): Promise<Response | void> => {
  const { data } = await TeamService.getAll();
  res.status(200).json(data);
};

const getId = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  const { data } = await TeamService.getId({ id });
  res.status(200).json(data);
};

export default {
  getAll,
  getId,
};
