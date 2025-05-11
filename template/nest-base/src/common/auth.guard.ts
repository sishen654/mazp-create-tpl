import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from 'src/libs/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const requireLogin = this.reflector.getAllAndOverride('require-login', [context.getClass(), context.getHandler()]);
    // 1 无需登录
    if (!requireLogin) {
      return true;
    }
    // 2 校验并解析
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }
    const token = authorization.split(' ')[1];
    const data = await this.jwtService.verify(token);
    // 3 将 User 信息到 request.user
    request.user = {
      userId: data.userId,
      username: data.username,
      email: data.email,
    };
    return true;
  }
}
