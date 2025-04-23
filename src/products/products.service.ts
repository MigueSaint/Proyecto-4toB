<<<<<<< HEAD
// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
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
=======
import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
        id: 0,
        name: 'Marco de fotos pequeño',
        description: 'Marco ideal para foto de 10x10'
    },
    {
        id: 1,
        name: 'Marco de fotos Mediano',
        description: 'Marco ideal para foto de 20x20'
    },
    {
        id: 2,
        name: 'Marco de fotos Grande',
        description: 'Marco ideal para foto de 50x40'
    },
    {
        id: 3,
        name: 'Vela aromática',
        description: 'Esta vela lanza ricos olores',
      },
]

getAll(): Product[] {
    return this.products;
  }

  getId(id: number) {
    return this.products.find( (item: Product) => item.id == id);
  }

  insert(body: any) {
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name: body.name,
        description: body.description,
      }
    ];
  }

  update(id: number, body: any) {
    let product: Product = {
      id,
      name: body.name,
      description: body.description,
    }
    this.products = this.products.map( (item: Product) => {
      console.log(item, id, item.id == id);
      return item.id == id ? product : item;
    });
  }

  delete(id: number) {
    this.products = this.products.filter( (item: Product) => item.id != id );
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}
>>>>>>> cf42c8a8409f356e528396b2c18f1407ee49c3f6
