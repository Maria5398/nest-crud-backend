import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { Post } from "src/post/entities";
import { hash } from 'bcrypt';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', length: 255 })
    name:string;

    @Column({ type: 'varchar', length: 255 })
    LastName:string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email:string;

    @Column({ type: 'varchar', length: 255, nullable: false, select: false })
    password:string;

    @Column({ type: 'bool', default: true })
    status: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }
}