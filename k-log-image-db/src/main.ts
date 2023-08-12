import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from "config"
import * as path from 'path';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', process.env.BACK_SERVER_URL || 'http://localhost:5000'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, '../..', 'public'), {
    prefix: `/api/`,
  });
  const serverConfig = config.get("server");
  const port = serverConfig.port;
  await app.listen(port);
  
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
` `