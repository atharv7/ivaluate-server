import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Grades extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text',{nullable:false})
    color: string

    @Column('text',{nullable:true})
    remarks: string

    @Column('date',{nullable:false})
    date: Date

    @Column('integer',{nullable:false})
    student: number

    @Column('integer',{nullable:false})
    teacher: number

}