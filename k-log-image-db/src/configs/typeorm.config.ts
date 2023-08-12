import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from "config"
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = config.get("db");

export const typeORMConfig: DataSourceOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/../**/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

export default new DataSource(typeORMConfig)