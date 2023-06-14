import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
// import { AuthenticationMiddleware } from './middleware/authentication.middleware';

// import { UserRedirectMiddleware } from './middleware/UserRedirectMiddleware.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(UserRedirectMiddleware);
  // app.use(AuthenticationMiddleware);
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}));
}
bootstrap();
