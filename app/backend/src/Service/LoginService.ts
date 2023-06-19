import { payload } from '../Interfaces';
import LoginModel from '../model/LoginModel';
import JWT from '../utils/JWT';
import bcrypt from '../utils/bcrypt';

export default class UserService {
  constructor(
    private loginModel = new LoginModel(),
  ) {}

  login = async (props: payload) => {
    const response = await this.loginModel.findOne(props.email);
    if (response !== null) {
      const isPasswordValid = await bcrypt.compare(
        { password: props.password, hash: response.password },
      );

      if (isPasswordValid) {
        const token = JWT.generateToken(props, response.role);

        return { status: 'SUCCESS', data: { token } };
      }
    }
    return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
  };
}
