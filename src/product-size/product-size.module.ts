import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './product-size.entity';
import { ProductSizeService } from './product-size.service';
import { ProductSizeController } from './product-size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize])],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
  exports: [ProductSizeService],
})
export class ProductSizeModule {}
