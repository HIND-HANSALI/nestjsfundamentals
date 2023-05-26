import { Injectable,HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { ProductDetails } from 'src/typeorm/entities/ProductDetails';
import {CreateProductParams} from '../../../utils/types';
import {UpdateProductParams} from '../../../utils/types';
import {CreateProductDetailsParams} from '../../../utils/types';
import {CreateProductReviewsParams} from '../../../utils/types';
import {CreateProductTagsParams} from '../../../utils/types';


import { Tag } from 'src/typeorm/entities/Tag';
import { Review } from 'src/typeorm/entities/Review';
import { HttpAdapterHost } from '@nestjs/core';
@Injectable()
export class ProductsService {
    // interact with dbb
     constructor(
        @InjectRepository(Product) private productRepository:Repository<Product>,
        @InjectRepository(ProductDetails) private productDetailsRepository:Repository<ProductDetails>,
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>

     ){
       
     }
    findProducts(){
        return this.productRepository.find({relations:['details','reviews','tags']});
    }
    CreateProduct(productDetails:CreateProductParams){
        const newProduct=this.productRepository.create({...productDetails,createdAt:new Date()});
        return this.productRepository.save(newProduct);
    }
    UpdateProduct(id:number,updateProductDetails:UpdateProductParams){
        //update the id who match in / what we want to update 
        return this.productRepository.update({id},{...updateProductDetails});
    }
    DeleteProduct(id:number){
        return this.productRepository.delete({id} );
    }
    
    async CreateProductDetails( id:number,CreateProductDetails:CreateProductDetailsParams){
        const product=await this.productRepository.findOneBy({id});
        if(!product){
            throw new HttpException(
                'User not found, cannot create profile',
                HttpStatus.BAD_REQUEST,
              );       
        }
        const newProductDetails=this.productDetailsRepository.create(CreateProductDetails);
        const saveProductDetails=await this.productDetailsRepository.save(newProductDetails);
        product.details=saveProductDetails;
        return this.productRepository.save(product);

    }

    async CreateProductReviews(id:number,CreateProductReviews:CreateProductReviewsParams){
        const product=await this.productRepository.findOneBy({id});
        if(!product){
            throw new HttpException(
                'User not found, cannot create profile',
                HttpStatus.BAD_REQUEST,
              );       
        }
        const newReview=this.reviewRepository.create({...CreateProductReviews,product});
        return this.reviewRepository.save(newReview); 

    }
   

    // async createTag(CreateTags:CreateProductTagsParams){
    //     const newTag = this.tagRepository.create(CreateTags);
    //     const createdTag = await this.tagRepository.save(newTag);
    //     return createdTag;
    //   }
}
