import DriverRepository from "../domain/repository/driver/driver.repository";

export default class DriverController extends DriverRepository {
  server: any;
  constructor(server: any) {
    super(server);
  }
}
