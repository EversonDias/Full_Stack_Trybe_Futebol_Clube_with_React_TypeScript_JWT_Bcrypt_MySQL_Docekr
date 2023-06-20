import { NextFunction, Request, Response } from 'express';
import StatusHTTP from '../utils/StatusHTTP';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class Validation {
  private static model = SequelizeTeam;
  static hasEmail = (req: Request, res: Response, next: NextFunction): Response | void => {
    const payload = req.body;
    if (!['email', 'password'].every((key) => key in payload)) {
      return res.status(StatusHTTP.badRequest).json({ message: 'All fields must be filled' });
    }
    return next();
  };

  static isEmailValid = (req: Request, res: Response, next: NextFunction): Response | void => {
    const payload = req.body;
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!regex.test(payload.email)) {
      return res.status(StatusHTTP.unauthorized).json({ message: 'Invalid email or password' });
    }
    return next();
  };

  static isPasswordValid = (req: Request, res: Response, next: NextFunction): Response | void => {
    const payload = req.body;
    if (payload.password.length < 6) {
      return res.status(StatusHTTP.unauthorized).json({ message: 'Invalid email or password' });
    }
    return next();
  };

  static isMatchEqual = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res
        .status(StatusHTTP.badRequest)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
  };

  static isTeamExists = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { homeTeamId, awayTeamId } = req.body;
    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);
    if (homeTeam && awayTeam) {
      return next();
    }
    return res.status(StatusHTTP.notFound).json({ message: 'There is no team with such id!' });
  };
}
