import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as JwtNestService } from '@nestjs/jwt';

declare module 'express' {
  interface Request {
    user: JwtUser;
  }
}

export interface JwtUser {
  userId: number;
  username: string;
  email: string;
}

@Injectable()
export class JwtService {
  @Inject(JwtNestService)
  jwtNestService: JwtNestService;

  async sign(payload: JwtUser, isRefresh = false) {
    const expiresIn = isRefresh ? process.env.JWT_REFRESH_TOKEN_EXPIRES_TIME : process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME;
    return this.jwtNestService.sign(payload, { expiresIn });
  }

  async verify(token: string): Promise<JwtUser> {
    try {
      return this.jwtNestService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }
}
