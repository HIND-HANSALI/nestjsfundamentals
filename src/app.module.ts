import { Module,MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './typeorm/entities/Product';
import { Review } from './typeorm/entities/Review';
import { Tag } from './typeorm/entities/Tag';
import { ProductsController } from './products/controllers/products/products.controller';

// import { UserRedirectMiddleware } from './middleware/UserRedirectMiddleware.middleware';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';

import { ProductsModule } from './products/products.module';
import { ProductDetails } from './typeorm/entities/ProductDetails';

import { RequestService} from './request.service';
import { User } from './user/User.entity';
import { UsersController } from './user/users.controller';
import { UsersModule } from './user/users.module';
import { UsersService } from './user/users.service';

import { AuthModule } from './authentification/auth.module';
import { AuthService } from './authentification/auth.service';
import { AuthController } from './authentification/auth.controller';
import { JwtService } from '@nestjs/jwt';

// import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule,AuthModule ,TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port:3308,
    username: 'root',
    password: '',
    database:'nestjsfundamentals',
    entities:[Product,ProductDetails,Review,Tag,User],
    synchronize: true,
  }), TypeOrmModule.forFeature([User]), ProductsModule,UsersModule,AuthModule],

  controllers: [AppController,UsersController,AuthController],
  providers: [AppService,RequestService,UsersService,AuthService,JwtService ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware)
    .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
