import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];

    const { ip, method, path } = request;

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        // 有结果才记录
        if (res) {
          this.logger.warn(
            `${method} ${path} ${ip} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms；Response: ${JSON.stringify(res)}`,
          );
        }
      }),
    );
  }
}
