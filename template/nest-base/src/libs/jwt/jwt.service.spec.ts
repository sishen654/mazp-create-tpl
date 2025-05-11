import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { JwtModule } from './jwt.module';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('测试生成 token', () => {
    const token = service.sign({
      userId: 1,
      username: 'test',
      email: 'test@test.com',
    });
    expect(token).toBeDefined();
  });

  it('测试验证 token', async () => {
    const token = service.sign({
      userId: 1,
      username: 'test',
      email: 'test@test.com',
    });
    const decoded = service.verify(token);
    expect(decoded.userId).toBe(1);
    expect(decoded.username).toBe('test');
    expect(decoded.email).toBe('test@test.com');
  });

  it('测试 token 过期', async () => {
    const token = service.sign(
      {
        userId: 1,
        username: 'test',
        email: 'test@test.com',
      },
      '1s',
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(() => service.verify(token)).toThrow(UnauthorizedException);
  });

  it('测试 token 无效', () => {
    const token = 'asdasdasd';
    expect(() => service.verify(token)).toThrow(UnauthorizedException);
  });

  it('正确抛出错误信息', () => {
    const token = 'asdasdasd';
    expect(() => service.verify(token)).toThrow('token 已失效，请重新登录');
  });
});
