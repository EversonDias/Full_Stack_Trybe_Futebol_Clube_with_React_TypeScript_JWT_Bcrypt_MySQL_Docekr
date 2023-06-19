import { Payload, typeDecode } from '../Interfaces';
import LoginModel from '../model/LoginModel';
import JWT from '../utils/JWT';
import bcrypt from '../utils/bcrypt';

export default class UserService {
  constructor(
    private loginModel = new LoginModel(),
    private jwt = new JWT(),
  ) {}

  login = async (props: Payload) => {
    const response = await this.loginModel.findOne(props.email);
    if (response !== null) {
      const isPasswordValid = await bcrypt.compare(
        { password: props.password, hash: response.password },
      );

      if (isPasswordValid) {
        const token = this.jwt.generateToken(props.email, response.role);

        return { status: 'SUCCESS', data: { token } };
      }
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  };

  getRole = (token: string) => {
    const isAuthorization = this.jwt.VerifyToken(token);
    if (isAuthorization !== null) {
      const data = (isAuthorization as typeDecode).role;
      return { status: 'SUCCESS', data: { role: data } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
  };
}
