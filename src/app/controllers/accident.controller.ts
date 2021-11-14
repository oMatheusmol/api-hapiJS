import { Server } from 'hapi';
import AccidentRepository from '../domain/repository/accident/accident.repository';

export default class AccidentController extends AccidentRepository {
  constructor(server: Server) {
    super(server);
  }
}
