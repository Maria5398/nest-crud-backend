import { Controller, Get, Post, Response, Request, Render } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Get('login') /*formulario de login */
    @Render('user/login')
    async loginPage() {
        return;
    }

    @Post('login') /*enviar infor para comparar con datos de db aun no validado */
    async login(@Request() req, @Response() res) {
        return res.redirect('/user/full');
    }
    
    @Get('profile')
    @Render('user/profile')
    async profilePage() {
        return;
    }
}
