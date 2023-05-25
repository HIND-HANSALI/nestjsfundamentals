import { IsString,IsEmail,IsInt,Length} from "class-validator";

export class CreateUserDto {
    @IsString()
    // @Length(3,20,{message:"incorrect lenght "})
    @Length(3,20,{groups:['create']})
    @Length(6,20,{groups:['update']})
    readonly username: string;

    @IsInt()
    readonly age: number;

    @IsEmail({},{message:"incorrect email"})
    readonly email: string;

    readonly country?:string; //?not required
    // no business logic
  }