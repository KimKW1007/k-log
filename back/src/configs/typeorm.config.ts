import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from "config"
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = config.get("db");

export const typeORMConfig: DataSourceOptions = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.DB_PORT || dbConfig.host,
  port: process.env.DB_HOST || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  timezone: 'Asia/Seoul',
  synchronize: false,
  migrations: [__dirname + '/../**/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

export default new DataSource(typeORMConfig)