// src/users/users.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  last_name: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column()
  birthday: Date;

  @Column('int', { width: 10 })
  identification: number;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
