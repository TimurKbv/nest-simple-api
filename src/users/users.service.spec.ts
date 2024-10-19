import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
    });

    it('should throw NotFoundException when file is not found', async () => {
      const error: NodeJS.ErrnoException = new Error('File not found');
      error.code = 'ENOENT';
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect(service.getAllUsers()).rejects.toThrow(NotFoundException);
    });

    it('should throw Error when file contains invalid JSON', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid JSON');
    
      await expect(service.getAllUsers()).rejects.toThrow('Error reading users file: Invalid JSON');
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));

      const result = await service.getUserById(1);
      expect(result).toEqual(mockUsers[0]);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));

      await expect(service.getUserById(2)).rejects.toThrow(NotFoundException);
    });
  });
});