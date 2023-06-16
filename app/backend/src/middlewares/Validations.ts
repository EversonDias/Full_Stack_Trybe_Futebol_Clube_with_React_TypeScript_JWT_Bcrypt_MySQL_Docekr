import { NextFunction, Request, Response } from 'express';
import StatusHTTP from '../utils/StatusHTTP';

export default class Validation {
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
}
