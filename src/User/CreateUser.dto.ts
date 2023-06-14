import { IsEmail, IsString,Length} from "class-validator";

export class CreateUserDto{

    @IsString()
    @Length(3,20)
    name:string;

    password:string;

    @IsEmail()
    email:string;
  
}