import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  username: string;

  @IsOptional()
  @IsEmail({}, { message: '不是合法的邮箱格式' })
  email: string;
}
