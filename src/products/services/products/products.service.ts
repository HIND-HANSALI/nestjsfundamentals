import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Product } from 'src/typeorm/entities/Product';
import {CreateProductParams} from '../../../utils/types';
import {UpdateProductParams} from '../../../utils/types';

@Injectable()
export class ProductsService {
    // interact with dbb
     constructor(@InjectRepository(Product) private productRepository:Repository<Product>){
       
     }
    findProducts(){
        return this.productRepository.find();
    }
    CreateProduct(productDetails:CreateProductParams){
        const newProduct=this.productRepository.create({...productDetails,createdAt:new Date()});
        return this.productRepository.save(newProduct);
    }
    UpdateProduct(id:number,updateProductDetails:UpdateProductParams){
        //update the id who match in / what we want to update 
        return this.productRepository.update({id},{...updateProductDetails});
    }
   
}
