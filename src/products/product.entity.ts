// products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

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

  @ManyToOne(() => User, user => user.products)
  user: User;
}