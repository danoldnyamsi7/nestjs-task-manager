import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { identity } from 'rxjs';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto,) {
    const user =  await this.usersService.createUser(createUserDto);
    console.log('user: ', user);
    return user;
  }

  @Get()
  getAllUsers() {
    let users = this.usersService.getAllUsers();
    return users;
  }

  @Get(':email')
  async getUser(@Param('email') email: string){
    let user = await this.usersService.getUser(email);
    return user;

  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id){
      await this.usersService.deleteUser(id);
    return {message: 'user successfuly deleted'}
  }

  // @Delete(':id')
}
