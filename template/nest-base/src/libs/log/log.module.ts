import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          level: 'error',
          dirname: process.env.WINSTON_LOG_DIRNAME,
          filename: process.env.WINSTON_LOG_ERROR_FILENAME,
          datePattern: process.env.WINSTON_LOG_DATE_PATTERN,
          maxSize: process.env.WINSTON_LOG_MAX_SIZE,
          maxFiles: process.env.WINSTON_LOG_ERROR_MAX_FILES,
        }),
        new winston.transports.DailyRotateFile({
          level: 'warn',
          dirname: process.env.WINSTON_LOG_DIRNAME,
          filename: process.env.WINSTON_LOG_WARN_FILENAME,
          datePattern: process.env.WINSTON_LOG_DATE_PATTERN,
          maxSize: process.env.WINSTON_LOG_MAX_SIZE,
          maxFiles: process.env.WINSTON_LOG_WARN_MAX_FILES,
        }),
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
        }),
      ],
    }),
  ],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
