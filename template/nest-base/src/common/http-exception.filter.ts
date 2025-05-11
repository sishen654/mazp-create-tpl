import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    response.statusCode = exception.getStatus();
    const { method, originalUrl, body, query, params, ip } = request;
    const res = exception.getResponse() as { message: string[] };

    // 返回的对象
    const jsonData = {
      code: exception.getStatus(),
      message: 'fail',
      data: res?.message?.join ? res?.message?.join(',') : exception.message,
    };

    // 记录日志
    this.logger.error('HttpException', {
      res: jsonData,
      req: {
        method,
        url: originalUrl,
        body,
        query,
        params,
        ip,
      },
    });

    response.json(jsonData).end();
  }
}
