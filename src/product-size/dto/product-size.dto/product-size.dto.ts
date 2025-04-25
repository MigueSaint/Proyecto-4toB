// src/product-size/product-size.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from '../products/product.entity';
import { Size } from '../size/size.entity';

@Entity()
export class ProductSizeDto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Product, (product) => product.productSizes, { onDelete: 'CASCADE' })
    product: Product;
  
    @ManyToOne(() => Size, (size) => size.productSizes, { cascade: true, onDelete: 'CASCADE' })
    size: Size;
  
    @Column()
    euSize: string;
  
    @Column()
    usSize: string;
  
    @Column()
    ecuadorSize: string;
  
    @Column()
    gender: 'hombre' | 'mujer' | 'niño';
  
    @Column('decimal', { precision: 5, scale: 2 })
    price: number;
  
    @Column('int')
    stock: number;
}
