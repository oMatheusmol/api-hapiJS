import { verify } from 'jsonwebtoken';
import config from 'config';

export const authMiddleware = (req: any) => {
  let response;
  const token = req.headers['x-api-key'];
  const secret: string = config.get('AUTH.SECRET');
  if (token) {
    verify(token, secret, (err: any, decoded: any) => {
      if (err) return (response = false);
      req.security = decoded;
      response = true;
    });
  } else {
    response = false;
  }
  return response;
};
