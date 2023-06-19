import { Request, Response } from 'express';
import StatusHTTP from '../utils/StatusHTTP';
import RoleService from '../Service/RoleService';

export default class RoleController {
  constructor(
    private roleService = new RoleService(),
  ) {}

  getRole = async (req: Request, res: Response): Promise<Response | void> => {
    const { authorization } = req.headers;
    if (authorization) {
      const result = this.roleService.getRole(authorization);
      if (result.status === 'SUCCESS') {
        return res.status(StatusHTTP.success).json(result.data);
      }
    }
    return res.status(StatusHTTP.unauthorized).json({ message: 'Token not found' });
  };
}
