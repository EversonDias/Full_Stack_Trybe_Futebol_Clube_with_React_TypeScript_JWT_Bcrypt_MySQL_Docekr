import { payload } from '../Interfaces';
import LoginModel from '../model/LoginModel';
import bcrypt from '../utils/bcrypt';

export default class UserService {
  constructor(
    private loginModel = new LoginModel(),
  ) {}

  login = async (props: payload) => {
    const response = await this.loginModel.findOne(props);
    if (response === null) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const isPasswordValid = await bcrypt.compare(
      { password: props.password, hash: response.password },
    );
    if (isPasswordValid) {
      const token = bcrypt.hash(props.password);
      return { status: 'SUCCESS', data: { token } };
    }
    return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
  };
}
