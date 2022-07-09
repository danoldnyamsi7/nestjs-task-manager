import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  
  constructor(private readonly userRepository: UserRepository,
    ) { }

  async createUser(createUserDto: CreateUserDto, name?: string): Promise<User> {
    try {
      const user = await this.userRepository.createUser(createUserDto, name);
      return user;
    } catch (error) {
      return error;
    }

  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getUser(id: string) {
    let user = await this.userRepository.getUser(id);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      let update = await this.userRepository.updateUser(id, updateUserDto);
      return update;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id:string):Promise<void>{
    this.userRepository.deleteUser(id);
    console.log({message: `${id} deleted`});
  } 

  async getUserByAny(email?: string, name?: string):Promise<User>{
      let user = await this.userRepository.getUserByAny(name, email);
      if(user) return user;
      throw new UnauthorizedException('user not found'); 
  }

}

