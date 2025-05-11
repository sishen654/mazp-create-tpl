import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './libs/prisma/prisma.service';
import { RedisService } from './libs/redis/redis.service';
import { EmailService } from './libs/email/email.service';
import { ExcelService } from './libs/excel/excel.service';
import { JwtService } from './libs/jwt/jwt.service';

@Injectable()
export class AppService {
  @Inject(PrismaService)
  prismaService: PrismaService;

  @Inject(RedisService)
  redisService: RedisService;

  @Inject(EmailService)
  emailService: EmailService;

  @Inject(ExcelService)
  excelService: ExcelService;

  @Inject(JwtService)
  jwtService: JwtService;

  async getHello() {
    return this.jwtService.sign({
      userId: 1,
      username: 'test',
      email: 'test@test.com',
    });
    // const users = await this.prismaService.user.findMany();
    // return users;
    // return 'Hello World!';
  }
}
