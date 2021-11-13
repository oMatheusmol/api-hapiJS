import { getRepository } from 'typeorm';
import ClientEntity from '../../entity/client.entity';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import cpf from '../../../common/util/cpf.util'

export default class ClientRepository {
  server: any;
  path: string;
  constructor(server: any) {
    this.server = server;
    this.path = '/client';
    this.post();
    this.get();
    this.patch();
  }

  post() {
    this.server.route({
      method: 'POST',
      path: `${this.path}`,
      handler: async (request: any, h: any) => {
        const auth = authMiddleware(request);
        if (!auth) return { message: 'Access Denied' };

        const repository = getRepository(ClientEntity);

        const valid = cpf.isValid(request.payload.cpf);

        if(!valid) return {message : 'Invalid cpf'}

        const client: any = await repository.find({ cpf: request.payload.cpf });
        if (client.length > 0) return { message: 'Client already exist' };

        const result = await repository.save(request.payload);

        return { message: 'Client created with success', clientId: result.id };
      },
    });
  }

  get() {
    this.server.route({
      method: 'GET',
      path: `${this.path}`,
      handler: async (request: any, h: any) => {
        const auth = authMiddleware(request);
        if (!auth) return { message: 'Access Denied' };

        const repository = getRepository(ClientEntity);
        return await repository.find({ id: request.headers.id });
      },
    });
  }

  patch() {
    this.server.route({
      method: 'PATCH',
      path: `${this.path}`,
      handler: async (request: any, h: any) => {
        const auth = authMiddleware(request);
        if (!auth) return { message: 'Access Denied' };

        const repository = getRepository(ClientEntity);
        return await repository.save(request.payload);
      },
    });
  }
}
