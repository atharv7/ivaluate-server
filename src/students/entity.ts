import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text',{nullable:false})
  fullName: string

  @Column('text',{nullable:false})
  photo: string

  @Column('integer')
  batch: number

  @Column('text',{default:'Not Graded Yet!'})
  lastGrade: string

}
