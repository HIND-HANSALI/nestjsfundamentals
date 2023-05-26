import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Review } from 'src/typeorm/entities/Review';
import { Tag} from 'src/typeorm/entities/Tag';
import { ProductDetails } from 'src/typeorm/entities/ProductDetails';

@Module({
  imports:[TypeOrmModule.forFeature([Product,ProductDetails,Review,Tag])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
