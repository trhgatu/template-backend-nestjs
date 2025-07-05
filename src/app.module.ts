import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { AppController } from './app.controller';

import { TestModule } from '@modules/test';
import { AuthModule } from '@modules/auth/auth.module';
import { RoleModule } from '@modules/role/role.module';
import { UserModule } from '@modules/user';
import { PermissionModule } from '@modules/permission';
import { AuditLogModule } from '@modules/audit-log/audit-log.module';
import { CreateAuditLogMiddleware } from '@shared/middlewares/create-audit-log.middleware';

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
