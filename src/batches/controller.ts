import {JsonController, Authorized, Post, Param, HttpCode,  Get, Body} from 'routing-controllers'
import { Batch} from './entity'
import Student from '../students/entity';

@JsonController()
export default class BatchController {

    @Authorized()
    @Get('/batches/:id([0-9]+)')
    getBatch(
      @Param('id') id: number
    ) {
      return Batch.findOne(id)
    }
  
    @Authorized()
    @Get('/batches')
    getBatches() {
      return Batch.find()
    }
//ALGORITHM BACKEND STARTS
    // @Authorized() SAME ISSUES (jwt malformed)
    @Post('/randomstudent')
    @HttpCode(201)
    async getRandomStudent(
      @Body() { batch, color } 
    ) {
      const studentsInBatch = await Student.find({where: {batch: batch}})
      if (!studentsInBatch) return 'No Students Yet!'
      const coloredStudents = studentsInBatch.filter(student=>student.lastGrade===color)
      if(coloredStudents.length) return coloredStudents[Math.floor(Math.random()*coloredStudents.length)]
      return studentsInBatch[Math.floor(Math.random()*studentsInBatch.length)]
    

    }
//ALGORITHM BACKEND ENDS

    @Authorized()
    @Post('/batches')
    @HttpCode(201)
    async createBatch(
      @Body() { starts, ends, batch } : Batch
    ) {
      
      const entity = new Batch
      entity.starts=starts
      entity.ends=ends
      entity.batch=batch
      await entity.save()
      const createdbatch = await Batch.findOne(entity.id)

      return createdbatch
    }
}