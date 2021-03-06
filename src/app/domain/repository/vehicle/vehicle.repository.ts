import { getRepository } from 'typeorm';
import VehicleEntity from '../../entity/vehicle.entity';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { Server } from 'hapi';

export default class DriverRepository {
  server: any;
  path: string;
  constructor(server: Server) {
    this.server = server;
    this.path = '/vehicles';
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
          const repository = getRepository(VehicleEntity);

          const vehicle = await repository.find({ licenseplate: request.payload.licenseplate });
          if (vehicle.length > 0) return { message: 'Vehicle already exist' };

          const result = await repository.save(request.payload);
          return { message: 'Vehicle created with success', vehicleid: result.id };
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
          const repository = getRepository(VehicleEntity);
          return await repository.find({ id: request.headers.id });
        } catch (e: any) {
          return e;
        }
      },
    });
  }
}
