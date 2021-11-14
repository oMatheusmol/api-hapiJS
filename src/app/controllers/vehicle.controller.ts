import { Server } from 'hapi';
import VehicleRepository from '../domain/repository/vehicle/vehicle.repository';

export default class VehicleController extends VehicleRepository {
  constructor(server: Server) {
    super(server);
  }
}
