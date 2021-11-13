import { verify } from 'jsonwebtoken';
import config from 'config';

export const authMiddleware = (req: any, reply: any) => {
  const token = req.headers['x-api-key'];
  const secret: string = config.get('AUTH.SECRET');
  if (token) {
    verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        throw new Error(`Access Denied`);
      }
      req.security = decoded;
    });
  }
  return true;
};
