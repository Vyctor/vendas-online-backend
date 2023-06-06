import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateUserDTO from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userService.createUser(createUser);
    return user;
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
