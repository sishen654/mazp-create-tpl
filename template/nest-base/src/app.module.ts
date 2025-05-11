import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './libs/redis/redis.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { ExcelModule } from './libs/excel/excel.module';
import { EmailModule } from './libs/email/email.module';
import { JwtModule } from './libs/jwt/jwt.module';
import { UserModule } from './modules/user/user.module';
import { AaaModule } from './modules/aaa/aaa.module';
import { AuthGuard } from './common/auth.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { FormatResponseInterceptor } from './common/format-response.interceptor';
import { LogModule } from './libs/log/log.module';
import { InvokeRecordInterceptor } from './common/invoke-record.interceptor';
import { CustomExceptionFilter } from './common/http-exception.filter';

@Module({
  imports: [PrismaModule, RedisModule, ExcelModule, EmailModule, JwtModule, UserModule, AaaModule, LogModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: InvokeRecordInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
