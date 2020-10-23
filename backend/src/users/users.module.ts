import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserResolvers } from './users.resolvers';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService, UserResolvers],
  exports: [TypeOrmModule],
})
export class UserModule {}
