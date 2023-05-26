import {Column,Entity,PrimaryGeneratedColumn,OneToOne} from'typeorm';
@Entity({ name: 'productdetails' })
export class ProductDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

//   @OneToOne(() => Product, (product) => product.details)
//   product: Product;
}