import { getRepository } from 'typeorm';
import config from 'config';
import GenerateUserToken from '../common/util/generateToken.util';

export default class AuthController {
  server: any;

  constructor(server: any) {
    this.server = server;
    this.post();
  }

  post() {
    this.server.route({
      method: 'POST',
      path: '/auth',
      handler: (request: any, h: any) => {
        const user: string = config.get('AUTH.LOGIN');
        const pass: string = config.get('AUTH.PASSWORD');

        if (request.payload.password !== pass || request.payload.username !== user) {
          throw new Error('Username ou senha incorretos');
        }
        console.info(`User ${user.toUpperCase()} logado.`);
        return { user, token: GenerateUserToken(user) };
      },
    });
  }
}
