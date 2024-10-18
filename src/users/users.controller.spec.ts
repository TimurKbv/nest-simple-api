import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);

      expect(await controller.getUsers()).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const result = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(service, 'getUserById').mockResolvedValue(result);

      expect(await controller.getUserById(1)).toBe(result);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(service, 'getUserById').mockRejectedValue(new NotFoundException());

      await expect(controller.getUserById(999)).rejects.toThrow(NotFoundException);
    });
  });
});