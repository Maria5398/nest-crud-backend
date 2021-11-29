import { Controller, Request, Get, Post, Render, Response  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

    @Get('/login') /*formulario de login */
    @Render('user/login')
    async loginPage(@Request() req,) {
        return;
    }
    @Post('/login') /*enviar infor , noo tiene validacciones */
    async login(@Request() req, @Response() res) {
        return res.redirect('/post/full');
    }

    @Get('/register') /* formulario de registro */
    @Render('user/register')
    async registerPage(@Request() req,) {
        return;
    }
    @Post('/register') /*enviar infor , noo tiene validacciones */
    async register(@Request() req, @Response() res) {
        return res.redirect('/user/login');
    }
    /*createOne(
        @Body() dto: CreateUserDto,  @Response() res
    ){
        const postUer = this.userService.createOne(dto);
        if(postUser) return res.redirect('/login')
    } */

    @Get('full') /* mosstrar todos los post ssubidos a  la db*/
    @Render('user/listUser')
    async getMany(@Request() req,){
        return;
    }
}
