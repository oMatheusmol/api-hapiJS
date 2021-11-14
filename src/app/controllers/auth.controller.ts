import config from 'config';
import GenerateUserToken from '../common/util/generateToken.util';
import { Server } from 'hapi';

interface IResponse {
  user: string;
  token: string;
}
export default class AuthController {
  server: Server;

  constructor(server: Server) {
    this.server = server;
    this.post();
  }

  post(): void {
    this.server.route({
      method: 'POST',
      path: '/auth',
      handler: async (request: any, h: any): Promise<IResponse | Error> => {
        try {
          const user: string = config.get('AUTH.LOGIN');
          const pass: string = config.get('AUTH.PASSWORD');

          if (request.payload.password !== pass || request.payload.username !== user) {
            throw new Error('Username ou senha incorretos');
          }
          console.info(`User ${user.toUpperCase()} logado.`);
          return { user, token: GenerateUserToken(user) };
        } catch (e: any) {
          return e;
        }
      },
    });
  }
}
