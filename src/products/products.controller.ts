import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query('name') name?: string,
    @Query('stock') stock?: number,
    @Query('size') sizeName?: string,
    @Query('gender') gender?: string,
  ) {
    return this.productsService.getAll(name, stock, sizeName, gender);
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.remove(id);
  }
}
