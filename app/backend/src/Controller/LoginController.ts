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
    if (response.status === 'SUCCESS') {
      res.status(StatusHTTP.success).json(response.data);
    }
    res.status(StatusHTTP.unauthorized).json(response.data);
  };
}
