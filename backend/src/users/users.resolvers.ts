import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User, AuthPayload } from '../graphql.schema';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '../auth/jwt-graphql.guard';
import { CreateUserDTO } from './dto/createUser.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolvers {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  @Query(returns => AuthPayload)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDTO): Promise<User> {
    const createdUser = this.usersService.add(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
