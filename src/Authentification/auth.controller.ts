import { Controller,Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsersService } from 'src/user/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
   
    signIn(@Body('password') password:string, @Body('name') name:string,) {
      return this.authService.signIn(name,password);
    }
}
