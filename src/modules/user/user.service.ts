import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import CreateUserDTO from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const salt = 1000;
    const hashedPassword = await hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    createUserDto['typeUser'] = 1;
    return this.userRepository.create(createUserDto);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
