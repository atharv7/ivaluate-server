import { 
    JsonController, Authorized, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
    Body, Patch 
  } from 'routing-controllers'
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
    async getRandomStudent(
      @Body() { batch, color } 
    ) {
      const studentsInBatch = await Student.find({where: {batch: batch}})
      const coloredStudents = studentsInBatch.filter(student=>student.lastGrade===color)
      return coloredStudents[Math.floor(Math.random()*coloredStudents.length)]
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