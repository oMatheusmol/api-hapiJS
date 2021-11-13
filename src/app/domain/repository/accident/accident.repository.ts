import { getRepository } from 'typeorm';
import AccidentEntity from '../../entity/accident.entity';
import DrivertEntity from '../../entity/driver.entity';
import { authMiddleware } from '../../../middlewares/auth.middleware';

export default class AccidentRepository {
  server: any;
  path: string;
  constructor(server: any) {
    this.server = server;
    this.path = '/accident';
    this.post();
    this.get();
  }

  post() {
    this.server.route({
      method: 'POST',
      path: `${this.path}`,
      handler: async (request: any, h: any) => {
        const auth = authMiddleware(request);
        if (!auth) return { message: 'Access Denied' };

        const repository = getRepository(AccidentEntity);
        const driverRepository = getRepository(DrivertEntity);

        const driver = await driverRepository.find({ cpf: request.payload.driverCpf });

        if (driver.length < 1) {
          const newDriver = await driverRepository.save({
            name: request.payload.driverName,
            cpf: request.payload.driverCpf,
            clientid: request.payload.clientid,
          });

          const result = await repository.save({
            driverid: newDriver.id,
            vehicleid: request.payload.vehicleid,
          });

          return { message: 'Accident created with success', accidentId: result.id };
        }else{
          const result = await repository.save({
            driverid: driver[0].id,
            vehicleid: request.payload.vehicleid,
          });
          return { message: 'Accident created with success', accidentId: result.id };
        }

      },
    });
  }

  get() {
    this.server.route({
      method: 'GET',
      path: `${this.path}`,
      handler: async (request: any, h: any) => {
        try {
          const auth = authMiddleware(request);
          if (!auth) return { message: 'Access Denied' };

          const repository = getRepository(AccidentEntity);
          return await repository.find({ id: request.headers.id });
        } catch (e) {
          return e;
        }
      },
    });
  }
}
