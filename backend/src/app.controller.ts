import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UsersService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) { }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.add(user);
  }
}
