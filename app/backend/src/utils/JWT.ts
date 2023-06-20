import * as Jwt from 'jsonwebtoken';

export default class JWT {
  static privateKey = process.env.JWT_SECRET || 'privateKey';

  generateToken = (email: string, role: string) => {
    const token = Jwt.sign(
      { email, role },
      JWT.privateKey,
      { algorithm: 'HS256', expiresIn: '1h' },
    );
    return token;
  };

  decodeToken = (token: string) => {
    const decoded = Jwt.decode(token);
    return decoded;
  };

  VerifyToken = (token: string) => {
    try {
      const result = Jwt.verify(token, JWT.privateKey);
      return result;
    } catch (error) {
      return null;
    }
  };
}
