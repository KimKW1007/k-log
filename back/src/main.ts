import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from "config"
import * as cookieParser from "cookie-parser"
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const serverConfig = config.get("server");
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
