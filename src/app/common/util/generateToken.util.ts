import { sign } from 'jsonwebtoken';
import config from 'config';

export default function GenerateUserToken(username: string) {
  const secret: string = config.get('AUTH.SECRET');
  const token = sign({ username }, secret, { expiresIn: '1d' });

  return token;
}
