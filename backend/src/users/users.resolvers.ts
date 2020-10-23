import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../graphql.schema';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser.dto';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(UsersGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDTO): Promise<User> {
    console.log(args);
    const createdUser = this.usersService.add(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  catCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
