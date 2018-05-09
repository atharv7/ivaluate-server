import { JsonController, Post, Param,Delete, Get,Put, Body, Authorized,HttpCode, NotFoundError } from 'routing-controllers'
import Student from './entity';


@JsonController()
export default class StudentController {
  
  @Authorized()
  @Post('/students')
  @HttpCode(201)
  async createStudent(
    @Body() { fullName, photo, batch }: Student
  ) {
    const entity = new Student
    entity.fullName=fullName
    entity.photo=photo
    entity.batch=batch

    const student = await entity.save()

    return student
  }

  

  @Authorized()
    @Get('/students/:id([0-9]+)')
    
    getStudents(@Param('id') id: number) {
      return Student.find({batch: id})
    }

    @Authorized()
    @Get('/students')
    
    getAllStudents() {
      return Student.find()
    }

  // @Authorized()
    @Put('/students/:id')
    @HttpCode(200)
    async editStudent(@Param('id') id: number,
      @Body() { fullName, photo, batch }: Student
    ) {
      const entity = await Student.findOne(id)
      if(entity) {
      entity.fullName=fullName
      entity.photo=photo
      entity.batch=batch
      return await entity.save()
      
      } else {
        throw new NotFoundError
      }
      
    }

}
