import { IsString,IsEmail,IsInt,Length} from "class-validator";

export class UpdateProductDto {
   
    title: string;
  
    quantity: number;
   
    description: string;
}