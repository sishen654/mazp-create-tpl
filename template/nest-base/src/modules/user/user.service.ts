import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtUser } from 'src/libs/jwt/jwt.service';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { md5 } from 'src/utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { EmailService } from 'src/libs/email/email.service';
import { RedisService } from 'src/libs/redis/redis.service';

@Injectable()
export class UserService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  async getToken(user: JwtUser) {
    return {
      token: await this.jwtService.sign(user),
      refreshToken: await this.jwtService.sign(user, true),
    };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.jwtService.verify(refreshToken);
    return {
      token: await this.jwtService.sign({
        userId: user.userId,
        username: user.username,
        email: user.email,
      }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    // 1 查询用户
    const foundUsers = await this.prismaService.user.findMany({
      where: {
        OR: [{ username: loginUserDto.userAccount }, { email: loginUserDto.userAccount }],
      },
    });
    const foundUser = foundUsers[0];
    // 2 用户不存在, 抛出错误
    if (!foundUser) throw new BadRequestException('用户不存在');
    // 3 密码不正确, 抛出错误
    if (foundUser.password !== md5(loginUserDto.password)) throw new BadRequestException('密码不正确');
    // 4 返回 Token
    return this.getToken({
      userId: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    });
  }

  async register(user: RegisterUserDto) {
    // 1 查询用户的邮箱或者用户名是否已注册
    const foundUsers = await this.prismaService.user.findMany({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
    // 2 用户名/邮箱已被使用, 抛出错误
    if (foundUsers.some((item) => item.email === user.email)) throw new BadRequestException('邮箱已存在');
    if (foundUsers.some((item) => item.username === user.username)) throw new BadRequestException('用户名已存在');
    // 3 未注册，注册用户
    const newUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: md5(user.password),
      },
    });
    // 4 返回 Token
    return this.getToken({
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  }

  async getUserInfo(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        createTime: true,
        updateTime: true,
      },
    });
    return user;
  }

  async updateUserInfo(userId: number, user: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: user,
      select: {
        username: true,
        email: true,
        createTime: true,
        updateTime: true,
      },
    });
    return updatedUser;
  }

  async updatePwdCaptcha(address: string) {
    // 1 查询用户
    const foundUser = await this.prismaService.user.findUnique({
      where: { email: address },
    });
    // 2 用户不存在, 抛出错误
    if (!foundUser) throw new BadRequestException('用户不存在');
    // 3 生成验证码
    const code = Math.random().toString().slice(2, 8);
    // 4 设置验证码
    console.log(process.env.REDIS_UPDATE_PWD_PREFIX + address);
    await this.redisService.set(process.env.REDIS_UPDATE_PWD_PREFIX + address, code, 10 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '更改密码验证码',
      html: `<p>你的更改密码验证码是 ${code}</p>`,
    });
  }

  async updatePassword(passwordDto: UpdateUserPasswordDto) {
    const { password, email, captcha } = passwordDto;
    // 1 查询用户
    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    // 2 用户不存在, 抛出错误
    if (!foundUser) throw new BadRequestException('用户不存在');
    // 3 验证码不正确, 抛出错误
    const redisCaptcha = await this.redisService.get(process.env.REDIS_UPDATE_PWD_PREFIX + email);
    if (redisCaptcha !== captcha) throw new BadRequestException('验证码不正确');
    // 4 更新密码
    await this.prismaService.user.update({ where: { id: foundUser.id }, data: { password: md5(password) } });
  }
}
