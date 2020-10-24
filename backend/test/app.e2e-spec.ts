import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable, Module } from '@nestjs/common';
import * as request from 'supertest';
import { User } from './../src/entities/user.entity';

@Injectable()
class UserServiceMock {
  async findAll(): Promise<User[]> {
    return [];
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let usersService = { findAll: () => Promise.resolve([]) };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
