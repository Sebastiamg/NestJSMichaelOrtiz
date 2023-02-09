import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm"
import { CategoryEntity } from "./category.entities";

@Entity('products', {schema:'ventas'})

export class ProductEntity{
    @PrimaryGeneratedColumn('uuid')
    id:number
    @CreateDateColumn({
        name:'create_date',
        type:'timestamp',
        default:() => 'CURRENT_TIMESTAMP',
    })

    createAt:Date;
    @UpdateDateColumn({
        name:'update_date',
        type:'timestamp',
        default:() => 'CURRENT_TIMESTAMP',
    })

    updateAp:Date;
    @DeleteDateColumn({
        name:'delete_date',
        type:'timestamp',
        nullable:true,
    })
    deleteAp:Date;

    // RELACION ENTRE LA TABLA PRODUCTO CON CATEGORIA

    @ManyToOne(() => CategoryEntity, (category) => category.product)
    category: CategoryEntity;

    @Column('varchar', {
        name:'title',
        comment:'nombre del producto',
    })
    title:string;
    @Column('number', {
        name:'price',
        comment:'precio con 2 decimales del producto'
    })
    price:number;
    @Column('text', {
        name:'Description',
        comment: 'Descripcion del producto'
    })
    description:string;


    @Column('array',{
        name: 'images',
        comment:'Images del producto'
    })
    image:string[];

    @Column ('varchar',  {
        name: 'category-id',
        comment: 'id de la categoria con la que se relaciona',
    })

    categories:number;

     @BeforeInsert()
     @BeforeUpdate()

    async setTitle(){
        if(!this.title){
            return('Se me perdio el producto, busca vos');
        }
        this.title = this.title.toUpperCase();
    }
}

