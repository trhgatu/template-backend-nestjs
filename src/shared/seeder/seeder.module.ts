// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { PermissionSeeder } from './permission.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@modules/permission/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [PermissionSeeder],
  exports: [PermissionSeeder],
})
export class SeederModule {}
