import { Controller,Get ,Post ,Body} from '@nestjs/common';
import{ProductsService} from '../../services/products/products.service'
import{CreateProductDto} from '../../dtos/createProduct.dto';

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
        this.productService.CreateProduct(CreateProductDto);
    }

}
