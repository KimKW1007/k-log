import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),FileModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
