import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.add(user);
  }
}
