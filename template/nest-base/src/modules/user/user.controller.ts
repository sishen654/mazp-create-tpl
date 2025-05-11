import { Body, Controller, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RequireLogin, UserInfo } from 'src/common/decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('refresh')
  refresh(@Query('refreshToken') refreshToken: string) {
    return this.userService.refreshToken(refreshToken);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('userInfo')
  @RequireLogin()
  userInfo(@UserInfo('userId') userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @Put()
  @RequireLogin()
  updateUserInfo(@UserInfo('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserInfo(userId, updateUserDto);
  }

  @Get('updatePwdCaptcha')
  async updatePwdCaptcha(@Query('address') address: string) {
    return this.userService.updatePwdCaptcha(address);
  }

  @Post('updatePassword')
  async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
    return await this.userService.updatePassword(passwordDto);
  }
}
