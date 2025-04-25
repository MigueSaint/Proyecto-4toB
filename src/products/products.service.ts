// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto/products.dto';
import { UsersService } from '../users/users.service'; // Importa UsersService

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly usersService: UsersService, // Inyecta UsersService
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['user'] }) as Product[]; // Explicit type casting
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['user'] });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product as Product; // Explicit type casting
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.usersService.findOne(createProductDto.userId);
    const product = this.productRepository.create({ ...createProductDto, user });
    return await this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
      ...(updateProductDto.userId && { user: await this.usersService.findOne(updateProductDto.userId) }),
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  
}
