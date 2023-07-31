import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import CreateUserDTO from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import ReturnUserDto from './dtos/return-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const salt = 12;
    const hashedPassword = await hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    createUserDto['typeUser'] = 1;
    return this.userRepository.save(createUserDto);
  }

  async getAllUsers(): Promise<ReturnUserDto[]> {
    const userEntities = await this.userRepository.find();
    return userEntities.map((entity) => new ReturnUserDto(entity));
  }
}
