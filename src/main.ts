import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initRedis } from '@config/redis.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await initRedis();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Trhgatu API')
    .setDescription('NestJS backend template')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
