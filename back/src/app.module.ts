import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { FindModule } from './find/find.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),AuthModule, FindModule],
})
export class AppModule {}
