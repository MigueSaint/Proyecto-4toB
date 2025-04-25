import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ej: "M", "L", "XL"

  @Column()
  euSize: string;

  @Column()
  usSize: string;

  @Column()
  ecSize: string;

  @Column()
  gender: 'hombre' | 'mujer' | 'niño';

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];

  
}
