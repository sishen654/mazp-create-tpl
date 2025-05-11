import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { RequireLogin } from 'src/common/decorator';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Get()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get('/2')
  @RequireLogin()
  create2(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }
}
