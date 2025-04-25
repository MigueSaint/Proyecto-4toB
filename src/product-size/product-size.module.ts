// product-size/product-size.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './product-size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize])],
  exports: [TypeOrmModule],
})
export class ProductSizeModule {}
