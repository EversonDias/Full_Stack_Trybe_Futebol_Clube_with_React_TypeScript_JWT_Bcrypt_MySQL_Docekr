import { Request, Response } from 'express';
import LoginService from '../Service/LoginService';
import StatusHTTP from '../utils/StatusHTTP';

export default class UserController {
  constructor(
    public loginService = new LoginService(),
  ) {}

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const payload = req.body;
    const response = await this.loginService.login(payload);
    res.status(StatusHTTP.success).json(response?.data);
  };
}
