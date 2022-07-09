// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from 'src/users/users.module';
// import { UsersService } from 'src/users/users.service';
// import { UserRepository } from 'src/users/users.repository';
// import { User } from 'src/users/entities/user.entity';

// @Module({
//   imports: [
//     PassportModule.register({defaultStrategy: 'jwt'}),
//     JwtModule.register({
//       secret: 'user_secret',
//       signOptions: {
//         expiresIn: 3600
//       }
//     }),
//     UsersModule
//   ],

//   controllers: [AuthController],
//   providers: [AuthService, User],
//   exports: []
// })
// export class AuthModule {}
