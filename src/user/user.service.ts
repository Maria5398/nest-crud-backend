import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
export interface UserFindOne {
  id?: number;
  email?: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getMany() {
    return await this.userRepository.find();
  }
  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository.findOne(id)
      .then(u => !userEntity ? u : !!u && userEntity.id === u.id ? u : null)

    if (!user) throw new NotFoundException('usuario inexistente');

    return user;
}
  async createOne(dto: CreateUserDto) {
    const userExit = await this.userRepository.findOne({ email: dto.email });
    if (userExit) throw new BadRequestException('usuario existente');
    const newuser = await this.userRepository.create(dto);
    const user = await this.userRepository.save(newuser);
    delete user.password;
    return user;
  }
  async editOne(id: number, dto: EditUserDto, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    const editUser = Object.assign(user, dto);
    return await this.userRepository.save(editUser);
  }
  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    return await this.userRepository.remove(user);
  }
  async findOne(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
