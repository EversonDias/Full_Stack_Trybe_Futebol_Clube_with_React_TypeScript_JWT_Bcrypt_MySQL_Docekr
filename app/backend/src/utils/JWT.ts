import * as Jwt from 'jsonwebtoken';
import { payload } from '../Interfaces';

const privateKey = process.env.JWT_SECRET || 'privateKey';

const generateToken = (props: payload) => {
  const token = Jwt.sign(props, privateKey, { algorithm: 'HS256', expiresIn: '1h' });
  return token;
};

export default {
  generateToken,
};
