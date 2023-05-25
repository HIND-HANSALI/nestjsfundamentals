import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Product } from 'src/typeorm/entities/Product';
import {CreateProductParams} from '../../../utils/types';

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
}
