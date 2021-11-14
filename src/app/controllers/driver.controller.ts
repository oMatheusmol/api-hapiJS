import { Server } from 'hapi';
import DriverRepository from '../domain/repository/driver/driver.repository';

export default class DriverController extends DriverRepository {
  constructor(server: Server) {
    super(server);
  }
}
