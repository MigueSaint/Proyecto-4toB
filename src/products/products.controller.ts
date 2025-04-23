// products/products.controller.ts
import {Controller, Get, Post, Body, Param, Delete, Put, Patch, ParseIntPipe, HttpStatus, HttpCode, } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get()
    async getAllProducts() {
      return this.productsService.getAll();
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
  
    @Put(':id')
    async updateProduct(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProductDto: UpdateProductDto,
    ) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Patch(':id')
    async partialUpdateProduct(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProductDto: UpdateProductDto,
    ) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeProduct(@Param('id', ParseIntPipe) id: number) {
      await this.productsService.remove(id);
    }
  
    // Elimina las rutas de prueba o comentadas
  }