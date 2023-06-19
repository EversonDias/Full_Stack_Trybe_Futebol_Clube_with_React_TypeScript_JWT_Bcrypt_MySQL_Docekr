import { Request, Response } from 'express';
import LoginService from '../Service/LoginService';
import StatusHTTP from '../utils/StatusHTTP';
import { Payload } from '../Interfaces';

export default class UserController {
  constructor(
    public loginService = new LoginService(),
  ) {}

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const payload: Payload = req.body;
    const response = await this.loginService.login(payload);
    if (response.status === 'SUCCESS') {
      return res.status(StatusHTTP.success).json(response.data);
    }
    return res.status(StatusHTTP.unauthorized).json(response.data);
  };

  getRole = async (req: Request, res: Response): Promise<Response | void> => {
    const { authorization } = req.headers;

    if (authorization) {
      const result = this.loginService.getRole(authorization);
      if (result.status === 'SUCCESS') {
        return res.status(StatusHTTP.success).json(result.data);
      }
      return res.status(StatusHTTP.unauthorized).json(result.data);
    }
    return res.status(StatusHTTP.unauthorized).json({ message: 'Token not found' });
  };
}
