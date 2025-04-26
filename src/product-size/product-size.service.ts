import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSize } from './product-size.entity';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  findAll(): Promise<ProductSize[]> {
    return this.productSizeRepository.find({ relations: ['product', 'size'] });
  }

  async findOne(id: number): Promise<ProductSize> {
    const productSize = await this.productSizeRepository.findOne({ where: { id }, relations: ['product', 'size'] });

    if (!productSize) {
      throw new NotFoundException(`No se encontró un ProductSize con id: ${id}`);
    }

    return productSize;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificamos primero si existe
    await this.productSizeRepository.delete(id);
  }
}
