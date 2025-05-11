import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { RedisModule } from './redis.module';

describe('RedisService', () => {
  let module: TestingModule;
  let service: RedisService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('存入字符串缓存正常', async () => {
    expect(await service.set('test', 'test')).toBeUndefined();
  });

  it('获取字符串缓存正常', async () => {
    expect(await service.get('test')).toBe('test');
  });

  it('删除字符串缓存正常', async () => {
    await service.del('test');
    expect(await service.get('test')).toBeNull();
  });

  it('添加 1s 过期时间', async () => {
    expect(await service.set('test', 'test', 1)).toBeUndefined();
    expect(await service.get('test')).toBe('test');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(await service.get('test')).toBeNull();
  });
});
