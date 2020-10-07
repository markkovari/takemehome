import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable, Module } from '@nestjs/common';
import * as request from 'supertest';
import { User } from './../src/entities/user.entity';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/user/user.service';
import { AppController } from './../src/app.controller';

@Injectable()
class UserServiceMock {
  async findAll() :Promise<User[]> {
    return [];
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usrService = { findAll: () => Promise.resolve([]) };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async() => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
