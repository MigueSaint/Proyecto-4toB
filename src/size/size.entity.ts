import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsPositive, IsInt } from 'class-validator';
import { Product } from '../products/product.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @Column({ type: 'int', default: 0 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  // Relación de muchos a muchos con Product
  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}