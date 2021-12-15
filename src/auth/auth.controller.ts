import {
  Controller,
  Post,
  Get,
  UseGuards,
  Render,
  Res,
  Body,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { User as UserEntity } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { LoginDto } from './dtos/login.dto';
@ApiTags('Auth')
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
  async login(
    @Body() loginDto: LoginDto,
    @User() user: UserEntity,
    @Res() res,
  ) {
    const data = await this.authService.login(user);
    if (data) return res.redirect('/auth/profile');
  }
  @Auth()
  @Get('profile')
  @Render('user/profile')
  profilePage(@User() user: UserEntity) {
    return user;
  }
  @Get('refresh')
  refreshToken(@User() user: UserEntity, @Res() res) {
    const data = this.authService.login(user);
    if (data) return res.redirect('/auth/profile');
  }
}
