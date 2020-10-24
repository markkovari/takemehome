import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string | number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByUserName(name: string) {
    return this.usersRepository.findOne({ where: { name } });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async add(createUserDTO: CreateUserDTO) {
    createUserDTO.password = await hash(createUserDTO.password, {
      salt: Buffer.from(process.env.SALT || 'secret-salt'),
    });
    const newUser = this.usersRepository.create(createUserDTO);
    return this.usersRepository.save(newUser);
  }
}
