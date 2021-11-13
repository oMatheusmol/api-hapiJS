import VehicleRepository from "../domain/repository/vehicle/vehicle.repository";

export default class VehicleController extends VehicleRepository {
  server: any;
  constructor(server: any) {
    super(server);
  }
}
