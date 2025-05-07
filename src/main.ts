import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // global validation
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw on error on unauthorized properties
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
