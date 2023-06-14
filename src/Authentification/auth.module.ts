import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { User } from 'src/user/User.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService],
  exports: [AuthService],
})
export class AuthModule {}
