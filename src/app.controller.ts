import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App Module')
@Controller()
export class AppController {
  @Get('/')
  @Render('welcome')
  getHello() {
    return { message: this.appService.getHello() };
  }

  @Get('/home')
  @Render('index')
  getHome() {
    return { message: this.appService.getHello() };
  }
  constructor(private readonly appService: AppService) {}
}
