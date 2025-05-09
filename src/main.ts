import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // global validation
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw on error on unauthorized properties
      transform: true, // auto transform to DTO after validation
    }),
  );

  // <-- swagger config start -->
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('NestJS Blog API')
    .setDescription('API for a blog. http://localhost:3000/')
    .setTermsOfService('http://localhost:3000/terms-of-service.txt')
    .setLicense('MIT', 'http://localhost:3000/license.txt')
    .addServer('http://localhost:3000', 'Local server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // <-- swagger config end -->

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
