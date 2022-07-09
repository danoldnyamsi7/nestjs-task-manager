// import { SigninUserDto } from "src/users/dto/signin-user.dto";
// // import { UsersService } from "src/users/users.service";
// import { JwtService } from '@nestjs/jwt';
// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import * as bcrypt from 'bcrypt';
// import { JwtPayload } from "./interfaces/payload.interface";
// import { UsersService } from "src/users/users.service";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "src/users/entities/user.entity";

// @Injectable()
// export class AuthRepository {

//     constructor(@InjectRepository(User) private $repository: Repository<User>, private JwtService: JwtService) { }

//     async signin(SigninUserDto: SigninUserDto): Promise<string> {
//         const { email, password } = SigninUserDto;
//         try {
//             let isUserExist = await this.$repository.findOneBy({email});
//             if (!isUserExist) throw new UnauthorizedException('please check your credentials');
//             let isValidePwd = await bcrypt.compare(password, isUserExist.password);
//             if (!isValidePwd) throw new UnauthorizedException('wrong password');

//             // create access token
//             let payload: JwtPayload = { email, id: isUserExist.id };
//             let token = this.JwtService.sign(payload);
//             console.log(token);
//             return 'success;'

//         } catch (error) {
//             return error;
//         }
//     }
// }

