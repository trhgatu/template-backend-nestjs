import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { AppController } from './app.controller';

import { TestModule } from '@modules/test';
import { AuthModule } from '@modules/auth/auth.module';
import { RoleModule } from '@modules/role/role.module';
import { UserModule } from '@modules/user';
import { PermissionModule } from '@modules/permission';
/* import { AppService } from './app.service';  */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log('🚀 MongoDB URI:', process.env.MONGODB_URI);
        return {
          uri: process.env.MONGODB_URI,
          autoIndex: true,
        };
      },
    }),
    TestModule,
    AuthModule,
    RoleModule,
    UserModule,
    PermissionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
