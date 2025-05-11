import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './libs/redis/redis.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { ExcelModule } from './libs/excel/excel.module';
import { EmailModule } from './libs/email/email.module';
import { JwtModule } from './libs/jwt/jwt.module';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [RedisModule, PrismaModule, ExcelModule, EmailModule, JwtModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
