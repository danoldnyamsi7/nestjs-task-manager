import { IsEmail, Min, IsNotEmpty, MinLength, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @MaxLength(25)
    name: string;

}
