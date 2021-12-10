import { Controller, Post, Get, UseGuards, Render, Res } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User as UserEntity } from '../user/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login') /*formulario de login */
  @Render('user/login')
  async loginPage() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login') /*enviar infor para comparar con datos de db */
  async login(@User() user: UserEntity, @Res() res) {
    const data = await this.authService.login(user);
    if (data) return res.redirect('/auth/profile');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Render('user/profile')
  profilePage() {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  refreshToken(@User() user: UserEntity, @Res() res) {
    const data = this.authService.login(user);
    if (data) return res.redirect('/auth/profile');
  }
}
