import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'




@Entity()
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {nullable: false})
  batch: number

  @Column('date', {nullable: false})
  starts: Date

  @Column('date', {nullable: false})
  ends: Date

}

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable: false})
  name: string

  @Column('text', {nullable:true})
  photo: string

  @Column('integer', {nullable: false})
  batch: number
}
