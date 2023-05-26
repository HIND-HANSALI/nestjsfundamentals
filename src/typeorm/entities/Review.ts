import {Column,Entity,PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Product } from './Product';

@Entity({name:'reviews'})
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => Product, (product) => product.reviews) 
  product: Product;
}