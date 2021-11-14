import { getRepository } from 'typeorm';
import DriverEntity from '../../entity/driver.entity';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import cpf from '../../../common/util/cpf.util';
import { Server } from 'hapi';

export default class DriverRepository {
  server: any;
  path: string;
  constructor(server: Server) {
    this.server = server;
    this.path = '/drivers';
    this.post();
    this.get();
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
          const repository = getRepository(DriverEntity);

          const valid = cpf.isValid(request.payload.cpf);
          if (!valid) return { message: 'Invalid cpf' };

          const driver = await repository.find({ cpf: request.payload.cpf });
          if (driver.length > 0) return { message: 'Client already exist' };

          const result = await repository.save(request.payload);
          return { message: 'Driver created with success', driverId: result.id };
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
      config: {
        pre: [{ method: authMiddleware }],
      },
      handler: async (request: any, h: any): Promise<Object | Error> => {
        try {
          const repository = getRepository(DriverEntity);
          return await repository.find({ id: request.headers.id });
        } catch (e: any) {
          return e;
        }
      },
    });
  }
}
