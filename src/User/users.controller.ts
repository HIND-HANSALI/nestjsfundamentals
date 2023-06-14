import { Controller,Get,Post,Body,ParseIntPipe,Param,Put,Delete,ValidationPipe,UsePipes } from '@nestjs/common';
import { CreateUserDto} from './CreateUser.dto';
import {UpdateUserDto } from './UpdateUser.dto';
import { UsersService } from './users.service';
// import {AuthGuard}  from './@nestjs/passport';

@Controller('usersAuth')
export class UsersController {
    constructor(private usersService:UsersService){

    }
    @Post()
    createUsers(@Body() CreateUserDto:CreateUserDto ){
        return this.usersService.createUsers(CreateUserDto);
    }


    
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers(){
        this.usersService.getUsers();
    }

}
