// src/shared/seeder/permission.seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PermissionSeeder } from './permission.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(PermissionSeeder);

  await seeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
