import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

export class UpdateUserDto extends PickType(CreateUserDto,['name','password','email']){

}