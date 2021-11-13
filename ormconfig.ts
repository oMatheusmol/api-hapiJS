import config from 'config';

export default {
  type: config.get('DB.POSTGRES.TYPE'),
  host: config.get('DB.POSTGRES.HOST'),
  port: config.get('DB.POSTGRES.PORT'),
  username: config.get('DB.POSTGRES.USER'),
  password: config.get('DB.POSTGRES.PASSWORD'),
  database: config.get('DB.POSTGRES.DATABASE'),
  entities: ['src/app/domain/entity/**/*.ts'],
  migrations: ['src/app/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
