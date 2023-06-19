import JWT from '../utils/JWT';

export default class RoleService {
  getRole = (token: string) => {
    const result = JWT.decodeToken(token);
    return { status: 'SUCCESS', data: result };
  };
}
