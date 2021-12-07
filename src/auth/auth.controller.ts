import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Render,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/helpers/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
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
  login(@User() user: UserEntity, @Res() res): any {
    if (user) return res.redirect('/auth/profile');
  }

  @Get('profile')
  @Render('user/profile')
  async profilePage() {
    return;
  }
}
