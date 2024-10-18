import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly usersFilePath = path.join(process.cwd(), 'data', 'users.json');

  async getAllUsers(): Promise<UserDto[]> {
    try {
      const data = await fs.readFile(this.usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new NotFoundException('User data not found');
    }
  }

  async getUserById(id: number): Promise<UserDto> {
    const users = await this.getAllUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(` User with id ${id} not found`);
    }
    return user;
  }
}
