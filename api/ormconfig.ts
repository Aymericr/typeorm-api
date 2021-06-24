// https://typeorm.delightful.studio/interfaces/_driver_postgres_postgresconnectionoptions_.postgresconnectionoptions.html
const tsconfig = require('./tsconfig.json');
const isProduction = false;
const buildDirectory = tsconfig['compilerOptions']['outDir'];

module.exports =  {
  name: 'default',
  type: 'postgres',
  // url: 'postgres://aymeric@localhost:5432/typeorm',
  host: 'localhost',
  port: 5432,
  username: 'aymeric',
  database: 'typeorm',
  extra: {
    application_name: isProduction ? 'production' : 'development',
  },
  entities: [
    isProduction ? `${buildDirectory}/resources/**/*.entity.js` : './resources/**/*.entity.ts'
  ],
  subscribers: [
    'subscriber.ts',
  ],
  migrationsTableName: "_migrations",
  migrationsRun: false,
  migrations: [
      'migrations/*.ts'
  ],
  cli: {
    migrationsDir: './migrations',
    entitiesDir: './resources'
  },
  synchronize: false,
  logging: false
}