import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (user && compare(password, user.password)) {
      return user;
    }
    return null;
  }

  login(user: User){
    const { id, ...rest } = user;
    const payload = { sub: id };

    return {
      ...rest,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
