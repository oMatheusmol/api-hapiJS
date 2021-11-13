import Hapi from '@hapi/hapi';
import 'reflect-metadata';
import '../app/migration/connection';
import Routes from '../app/routes/index.routes';
import config from 'config';

export const init: any = async () => {
  const server = Hapi.server({
    port: config.get('SERVER.PORT'),
    host: config.get('SERVER.HOST'),
  });

  new Routes(server);
  await server.start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
