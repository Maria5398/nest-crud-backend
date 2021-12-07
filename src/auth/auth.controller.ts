import {
  Controller,
  Get,
  Post,
  Res,
  Render,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/helpers/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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
  login(@User() user: UserEntity, @Res() res: any) {
    const data = this.authService.login(user);
    if (data) return res.redirect('/auth/profile');
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Render('user/profile')
  async profilePage() {
    return;
  }
}
