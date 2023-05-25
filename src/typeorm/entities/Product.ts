import {Column,Entity,PrimaryGeneratedColumn} from'typeorm';

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
    
}