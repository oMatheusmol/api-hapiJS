import { getRepository } from 'typeorm';
import ClientEntity from '../../entity/client.entity';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import cpf from '../../../common/util/cpf.util';
import { Server } from 'hapi';

export default class ClientRepository {
  server: any;
  path: string;
  constructor(server: Server) {
    this.server = server;
    this.path = '/clients';
    this.post();
    this.get();
    this.patch();
  }

  post(): void {
    this.server.route({
      method: 'POST',
      path: `${this.path}`,
      config: {
        pre: [{ method: authMiddleware }],
      },
      handler: async (request: any, h: any): Promise<Object | Error> => {
        try {
          const repository = getRepository(ClientEntity);

          const valid = cpf.isValid(request.payload.cpf);
          if (!valid) return { message: 'Invalid cpf' };

          const client: any = await repository.find({ cpf: request.payload.cpf });
          if (client.length > 0) return { message: 'Client already exist' };

          const result = await repository.save(request.payload);
          return { message: 'Client created with success', clientId: result.id };
        } catch (e: any) {
          return e;
        }
      },
    });
  }

  get(): void {
    this.server.route({
      method: 'GET',
      path: `${this.path}`,
      // config: {
      //   pre: [{ method: authMiddleware }],
      // },
      handler: async (request: any, h: any): Promise<Object | Error> => {
        try {
          const repository = getRepository(ClientEntity);
          return await repository.find({ id: request.headers.id });
        } catch (e: any) {
          return e;
        }
      },
    });
  }

  patch(): void {
    this.server.route({
      method: 'PATCH',
      path: `${this.path}`,
      config: {
        pre: [{ method: authMiddleware }],
      },
      handler: async (request: any, h: any): Promise<Object | Error> => {
        try {
          const repository = getRepository(ClientEntity);
          return await repository.save(request.payload);
        } catch (e: any) {
          return e;
        }
      },
    });
  }
}
