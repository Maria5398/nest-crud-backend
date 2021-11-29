import { Controller, Request, Get, Post, Render, Response  } from '@nestjs/common';

@Controller()
export class UserController {

    @Get('/login')
    @Render('user/login')
    async loginPage(@Request() req,) {
        return;
    }
    @Post('/login')
    async login(@Request() req, @Response() res) {
        return res.redirect('/post/full');
    }

    @Get('/register')
    @Render('user/register')
    async registerPage(@Request() req,) {
        return;
    }
    @Post('/register')
    async register(@Request() req, @Response() res) {
        return res.redirect('/login');
    }

}
