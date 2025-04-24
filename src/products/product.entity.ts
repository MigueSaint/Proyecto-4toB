// products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Users } from '../users/users.entity';
import { Size } from 'src/size/size.entity';

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

  @ManyToMany(() => Size)
  @JoinTable()  // Especifica que esta entidad manejará la relación en una tabla intermedia
  sizes: Size[];

}