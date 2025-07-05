import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { AppController } from './app.controller';

import { TestModule } from '@modules/test';
import { AuthModule } from '@modules/auth';
import { RoleModule } from '@modules/role';
import { UserModule } from '@modules/user';
import { PermissionModule } from '@modules/permission';
import { AuditLogModule } from '@modules/audit-log';
import { CreateAuditLogMiddleware } from '@shared/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => {
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
    AuditLogModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateAuditLogMiddleware)
      .exclude('auth/(.*)', 'audit-logs')
      .forRoutes('*');
  }
}
