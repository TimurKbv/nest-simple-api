import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly usersFilePath = path.join(process.cwd(), 'src', 'users.json');

  async getAllUsers(): Promise<UserDto[]> {
    try {
      const data = await fs.readFile(this.usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Error reading users file: Invalid JSON');
      }
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        throw new NotFoundException('Users file not found');
      }
      throw error; 
    }
  }

  async getUserById(id: number): Promise<UserDto> {
    try {
      const users = await this.getAllUsers();
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while fetching the user');
    }
  }
}
