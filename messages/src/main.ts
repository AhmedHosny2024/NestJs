import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() { 
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes( new ValidationPipe() ); // This will make sure that all the incoming requests are validated against the DTOs
  await app.listen(3000);
}
bootstrap();
