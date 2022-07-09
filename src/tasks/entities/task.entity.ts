
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string

   @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    desc: string;


}

