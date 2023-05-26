import {Column,Entity,PrimaryGeneratedColumn,JoinColumn, OneToOne,OneToMany,ManyToMany,JoinTable} from'typeorm';
import {ProductDetails} from './ProductDetails';
import {Review} from './Review';
import {Tag} from './Tag';


@Entity({name:'products'})
export class Product{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    title: string;
    @Column()
    quantity: number;
    @Column()
    description: string;
    // @Column({default:new Date()})
    @Column()
    createdAt:Date;

    @Column({nullable:true})
    statut:String;

    @OneToOne(() => ProductDetails, {cascade: true }) 
    @JoinColumn()
    details: ProductDetails;

    @OneToMany(() => Review, (review) => review.product) //one-to-many relationship
    reviews: Review[];

    @ManyToMany(() => Tag, (tag) => tag.products) // Define the many-to-many relationship
    @JoinTable()
    tags: Tag[];
    
}