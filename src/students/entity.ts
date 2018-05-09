import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  fullName: string

  @Column('text')
  photo: string

  @Column('integer')
  batch: number

}
