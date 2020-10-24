import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { verify } from 'argon2';
import { AuthPayload } from 'src/graphql.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await verify(user.password, password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const validUser = await this.validateUser(email, password);
    if (!validUser) {
      throw Error('User cannot be found');
    }
    const payload = {
      name: validUser.name,
      id: validUser.id,
      email: validUser.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
