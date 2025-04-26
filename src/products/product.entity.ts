import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Users } from '../users/users.entity';
import { ProductSize } from '../product-size/product-size.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  stock: number;

  @ManyToOne(() => Users, user => user.products)
  user: Users;

  @OneToMany(() => ProductSize, (productSize) => productSize.product, { cascade: true, eager: true })
  productSizes: ProductSize[];
}
