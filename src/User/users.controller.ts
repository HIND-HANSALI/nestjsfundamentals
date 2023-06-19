import { Controller,Get,Post,Body,ParseIntPipe,Param,Put,Delete,ValidationPipe,UsePipes,Query} from '@nestjs/common';
import { CreateUserDto} from './CreateUser.dto';
import {UpdateUserDto } from './UpdateUser.dto';
import { UsersService } from './users.service';
// import { Query } from 'typeorm/driver/Query';
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
        return this.usersService.getUsers();
    }

    @Get(':name')
    async findOne(@Param('name') name: string) {
      return this.usersService.findOne(name);
    }
    @Post('/search')
    Search(@Query('key') key:string){
        return this.usersService.search(key) ;
    }
    @Post('faker')
    Faker(){
        return this.usersService.Faker();
    }
}
