import * as Jwt from 'jsonwebtoken';
import { payload } from '../Interfaces';

const privateKey = process.env.JWT_SECRET || 'privateKey';

const generateToken = (props: payload, role: string) => {
  const token = Jwt.sign({ ...props, role }, privateKey, { algorithm: 'HS256', expiresIn: '1h' });
  return token;
};

const decodeToken = (token: string) => {
  const decoded = Jwt.decode(token);
  return decoded;
};

export default {
  generateToken,
  decodeToken,
};
