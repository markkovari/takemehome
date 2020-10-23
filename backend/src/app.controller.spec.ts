import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UsersService } from './users/users.service';
import { User } from './entities/user.entity';

class DeviceServiceMock {
  async findAll(): Promise<User[]> {
    return [];
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: new DeviceServiceMock(),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return empty array', async () => {
      expect(await appController.getUsers()).toStrictEqual([]);
    });
  });
});
