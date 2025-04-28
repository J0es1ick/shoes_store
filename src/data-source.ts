import { DataSource } from 'typeorm';
import { config } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5000,
  username: 'postgres',
  password: '12345',
  database: 'shoes_store',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
