import ClientRepository from "../domain/repository/cliets/client.repository";

export default class ClientController extends ClientRepository {
  server: any;
  constructor(server: any) {
    super(server);
  }
}
