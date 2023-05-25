// export class UpdateUserDto{
//     username?: string;
//     age?: number;
//     email?: string;
//     country?:string; //?not required

import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

//   }
export class UpdateUserDto extends PartialType(CreateUserDto){

}