import { Controller, Request, Get, Post, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  @Get('auth/login')
  @Render('auth/login')
  async loginPage(@Request() req,) {
    return;
  }
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    return res.redirect('/home');
  }
  @Get()
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
