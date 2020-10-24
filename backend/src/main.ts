import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3014);
}
bootstrap();
