import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || '1234',
  database: process.env.TYPEORM_DATABASE || 'kvix',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  synchronize: false,
  migrations: ['dist/**/database/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
};
