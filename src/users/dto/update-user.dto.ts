import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @MinLength(8)
    password?: string;

    @IsNotEmpty()
    name?: string;

}

