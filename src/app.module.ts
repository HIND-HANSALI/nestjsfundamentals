import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './typeorm/entities/Product';
import { Review } from './typeorm/entities/Review';
import { Tag } from './typeorm/entities/Tag';

import { ProductsModule } from './products/products.module';
import { ProductDetails } from './typeorm/entities/ProductDetails';

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port:3308,
    username: 'root',
    password: '',
    database:'nestjsfundamentals',
    entities:[Product,ProductDetails,Review,Tag],
    synchronize: true,
  }), ProductsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
