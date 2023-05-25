import { Controller,Get,Post,Param,Body,Patch,Delete,HttpCode,ParseUUIDPipe,ValidationPipe,UsePipes} from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto';
import {UpdateUserDto} from './dtos/update-user.dto';
import {UserEntity} from './user.entity';
import {v4 as uuid} from "uuid";

@Controller('users')
@UsePipes(ValidationPipe) 
export class UsersController {
  
    private users:UserEntity[]=[];
    @Get()
    find(): UserEntity[] {
        // return 'This action returns all users';
        return this.users;
        // @Redirect('https://nestjs.com', 301)
      }

    @Get(":id")
    findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
      console.log(typeof id);
        return this.users.find((user: UserEntity)=> user.id===id);
        
      }

    @Post()
    create(@Body() CreateUserDto:CreateUserDto) {
        const newUser:UserEntity={
            ...CreateUserDto,
            id: uuid(),  //generate uuid

        }
        this.users.push(newUser);
        return newUser;
      }

    @Patch(":id")
    update(@Param('id') id: string,@Body(ValidationPipe) UpdateUserDto:UpdateUserDto) {
        //find the element index we want to update
        const index= this.users.findIndex((user: UserEntity)=> user.id===id);
        //update the element 
        this.users[index]={...this.users[index],...UpdateUserDto};//override des proprietes de certains propr
        return this.users[index];
        // return 'user updated';
      }

      @Delete(":id")
      @HttpCode(204)
    remove(@Param('id') id: string) {
        // create array and make elements in it
        this.users=this.users.filter((user: UserEntity)=> user.id !==id);
        // return 'user deleted';
        // const index= this.users.findIndex((user: UserEntity)=> user.id===id);
        // this.users.splice(index,1);
      }
}
