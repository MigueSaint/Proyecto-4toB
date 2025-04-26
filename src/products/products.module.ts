import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Users } from '../users/users.entity';
import { UsersModule } from '../users/users.module';
import { Size } from 'src/size/size.entity';
import { ProductSize } from '../product-size/product-size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Users, Size, ProductSize]),UsersModule,],
  
  controllers: [ProductsController,],
  providers: [ProductsService],
})
export class ProductsModule {}
