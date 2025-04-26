import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { Size } from 'src/size/size.entity';
import { ProductSize } from 'src/product-size/product-size.entity';
import { CreateProductDto } from './create-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,

    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,

    private readonly usersService: UsersService,
  ) {}

  async getAll(name?: string, stock?: number, sizeName?: string, gender?: string): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productSizes', 'productSize')
      .leftJoinAndSelect('productSize.size', 'size')
      .leftJoinAndSelect('product.user', 'user');

    if (name) {
      query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }

    if (stock) {
      query.andWhere('product.stock >= :stock', { stock });
    }

    if (sizeName) {
      query.andWhere('size.name = :sizeName', { sizeName });
    }

    if (gender) {
      query.andWhere('size.gender = :gender', { gender });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productSizes', 'productSizes.size', 'user'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.usersService.findOne(createProductDto.userId);

    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      stock: createProductDto.stock,
      user,
    });

    const savedProduct = await this.productRepository.save(product);

    for (const sizeInput of createProductDto.sizes) {
      let size = await this.sizeRepository.findOne({ where: { name: sizeInput.sizeName } });

      if (!size) {
        size = this.sizeRepository.create({
          name: sizeInput.sizeName,
          euSize: sizeInput.euSize,
          usSize: sizeInput.usSize,
          ecSize: sizeInput.ecuadorSize,
          gender: sizeInput.gender,
        });
        await this.sizeRepository.save(size);
      }

      const productSize = this.productSizeRepository.create({
        product: savedProduct,
        size,
        euSize: sizeInput.euSize,
        usSize: sizeInput.usSize,
        ecuadorSize: sizeInput.ecuadorSize,
        gender: sizeInput.gender,
        price: sizeInput.price,
        stock: sizeInput.stock,
      });

      await this.productSizeRepository.save(productSize);
    }

    return savedProduct;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
