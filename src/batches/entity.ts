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
