import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductSize } from '../product-size/product-size.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  euSize: string;

  @Column()
  usSize: string;

  @Column()
  ecSize: string;

  @Column()
  gender: 'hombre' | 'mujer' | 'niño';

  @OneToMany(() => ProductSize, (productSize) => productSize.size)
  productSizes: ProductSize[];
}
