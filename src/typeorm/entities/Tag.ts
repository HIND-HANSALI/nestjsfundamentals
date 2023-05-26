import {Column,Entity,PrimaryGeneratedColumn,JoinColumn, OneToOne,OneToMany,ManyToMany} from'typeorm';
import { Product } from './Product';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.tags) 
  products: Product[];
}