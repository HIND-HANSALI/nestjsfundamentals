import { Controller,Get ,Post ,Body,ParseIntPipe,Param,Put,Delete,UseInterceptors} from '@nestjs/common';
import{ProductsService} from '../../services/products/products.service'
import{CreateProductDto} from '../../dtos/createProduct.dto';
import{UpdateProductDto} from '../../dtos/updateProduct.dto';
import{CreateProductDetailsDto} from '../../dtos/createProductDetails.dto';
import{CreateProductReviewsDto} from '../../dtos/createProductReviews.dto';
import{CreateProductTagsDto} from '../../dtos/createProductTags.dto';
import {LoggingInterceptor} from '../../../interceptor/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('products')
export class ProductsController {
    // inject product service
    constructor(private productService:ProductsService){

    }

    @Get()
    getProducts(){
        return this.productService.findProducts();
    }
    @Post()
    createProduct(@Body() CreateProductDto:CreateProductDto){
        return this.productService.CreateProduct(CreateProductDto);
    }
    // idw to return the updated
    @Put(':id')
    async updateProductById(@Param('id',ParseIntPipe) id:number,@Body() UpdateProductDto:UpdateProductDto){
       await this.productService.UpdateProduct(id,UpdateProductDto);
    }
    @Delete(':id')
    async deleteProductById(@Param('id',ParseIntPipe) id:number){
        await this.productService.DeleteProduct(id);
     }
     @Post(':id/ProductDetails')
    createProductDetails(@Param('id',ParseIntPipe) id:number,@Body() CreateProductDetailsDto:CreateProductDetailsDto){
        return this.productService.CreateProductDetails(id,CreateProductDetailsDto);
    }

    @Post(':id/reviews')

    createProductReviews(@Param('id',ParseIntPipe) id:number,@Body() CreateProductReviewsDto:CreateProductReviewsDto){
        return this.productService.CreateProductReviews(id,CreateProductReviewsDto);
    }

    @Post(':id/tags')
    createProductTags(@Param('id',ParseIntPipe) id:number,@Body() CreateProductTagsDto:CreateProductTagsDto){
        return this.productService.CreateProductTags(id,CreateProductTagsDto);
    }
}
