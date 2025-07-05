// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '@config/database.config';
import { ConfigModule } from '@nestjs/config';
import { PermissionSeeder, RoleSeeder } from '@shared/seeder';
import {
  Permission,
  PermissionSchema,
} from '@modules/permission/permission.schema';
import { Role, RoleSchema } from '@modules/role/role.schema';

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
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [PermissionSeeder, RoleSeeder],
})
export class SeederModule {}
