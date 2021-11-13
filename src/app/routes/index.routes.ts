import AuthController from '../controllers/auth.controller';
import ClientController from '../controllers/client.controller';
import DriverController from '../controllers/driver.controller';
import VehicleController from '../controllers/vehicle.controller';
import AccidentController from '../controllers/accident.controller';

export default class Routes {
  server: any;
  constructor(server: any) {
    this.server = server;
    this.controllers();
  }
  controllers() {
    new AuthController(this.server);
    new ClientController(this.server);
    new DriverController(this.server);
    new VehicleController(this.server);
    new AccidentController(this.server);
  }
}
