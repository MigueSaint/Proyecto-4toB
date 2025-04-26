import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductSizeService } from './product-size.service';

@Controller('product-size')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Get()
  findAll() {
    return this.productSizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productSizeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productSizeService.remove(id);
  }
}
