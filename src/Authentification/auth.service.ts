import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from '../user/User.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { jwtConstants } from './constants';
// import { compare } from 'bcrypt';
import * as bcrypt from 'bcryptjs';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // private readonly secretKey = 'hxdfcgvbhjn'; 
    constructor(private jwtService: JwtService,
        @InjectRepository(User) private  UserRepository:Repository< User>
        ) {}

   
      async signIn(name:string, pass: string) {

        const user = await this.UserRepository.findOne({ where: { name } });
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        console.log(pass);
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        // console.log(isPasswordValid);        
        // console.log(user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password');
        }
        // if (user?.password !== pass) {
        //   throw new UnauthorizedException();
        // }
        const payload = { sub: user.id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload, {secret: jwtConstants.secret}),
          // , { secret: this.secretKey }
        };
      }
     

    //   async signPayload(payload: any) {
    //     // token to expire in 12 hours
    //     let token = sign(payload, 'secretKey', { expiresIn: '12h' });
    //     return token;
    // }
}
