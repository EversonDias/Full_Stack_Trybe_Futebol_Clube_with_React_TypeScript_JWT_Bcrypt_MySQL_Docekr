import { Request, Response } from 'express';
import LoginService from '../Service/LoginService';
import { Payload } from '../Interfaces';

export default class UserController {
  constructor(
    public loginService = new LoginService(),
  ) {}

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const payload: Payload = req.body;
    const { status, data } = await this.loginService.login(payload);
    return res.status(status).json(data);
  };

  getRole = async (req: Request, res: Response): Promise<Response | void> => {
    const { authorization } = req.headers;
    const { status, data } = this.loginService.getRole(authorization as string);
    return res.status(status).json(data);
  };
}
