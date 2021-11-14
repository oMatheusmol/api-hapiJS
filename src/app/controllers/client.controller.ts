import { Server } from 'hapi';
import ClientRepository from '../domain/repository/cliets/client.repository';

export default class ClientController extends ClientRepository {
  constructor(server: Server) {
    super(server);
  }
}
