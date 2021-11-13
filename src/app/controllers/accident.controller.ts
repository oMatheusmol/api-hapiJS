import AccidentRepository from "../domain/repository/accident/accident.repository";

export default class AccidentController extends AccidentRepository {
  server: any;
  constructor(server: any) {
    super(server);
  }
}
