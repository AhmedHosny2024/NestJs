import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieSession({
    keys: ['asdfasa'],
  }))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // security to filter out unwanted fields from the request
  }));
  await app.listen(3000);
}
bootstrap();
