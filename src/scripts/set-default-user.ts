import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
  DEFAULT_USER_NAME,
  DEFAULT_USER_LASTNAME,
} from '../config/constants';
import { User } from '../user/entities/user.entity';
export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);
  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email',{
      email: config.get<string>('DEFAULT_USER_EMAIL'),
      name: config.get<string>('DEFAULT_USER_NAME'),
      lastName: config.get<string>('DEFAULT_USER_LASTNAME'),
    })
    .getOne();
  if (!defaultUser) {
    const adminUser = userRepository.create({
      email: config.get<string>(DEFAULT_USER_EMAIL),
      name: config.get<string>(DEFAULT_USER_NAME),
      lastName: config.get<string>(DEFAULT_USER_LASTNAME),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
      roles: ['ADMIN'],
    });
    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser;