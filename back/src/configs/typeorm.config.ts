import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const typeORMConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: 5432,
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  migrations: [__dirname + '/../**/migrations/*.ts'],
  migrationsTableName: 'migrations',
  extra:{
    timezone:'Asia/Seoul'
  }
};

// export default new DataSource(typeORMConfig)