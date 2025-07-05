// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '@config/database.config';
import { ConfigModule } from '@nestjs/config';
import { PermissionSeeder } from './permission.seeder';
import {
  Permission,
  PermissionSchema,
} from '@modules/permission/permission.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        autoIndex: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [PermissionSeeder],
})
export class SeederModule {}
