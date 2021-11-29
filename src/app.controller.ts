import { Controller, Request, Get, Post, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  
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
