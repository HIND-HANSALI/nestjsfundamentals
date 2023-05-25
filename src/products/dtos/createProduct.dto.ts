import { IsString,IsEmail,IsInt,Length} from "class-validator";

export class CreateProductDto {
   
    title: string;
  
    quantity: number;
   
    description: string;
}