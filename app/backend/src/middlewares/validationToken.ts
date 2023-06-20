import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import StatusHTTP from '../utils/StatusHTTP';

export default class ValidationToken {
  private static jwt = new JWT();
  static verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;
    if (authorization) {
      const isValid = this.jwt.VerifyToken(authorization);
      if (isValid) {
        return next();
      }
      return res.status(StatusHTTP.unauthorized).json({ message: 'Token must be a valid token' });
    }
    return res.status(StatusHTTP.unauthorized).json({ message: 'Token not found' });
  };
}
