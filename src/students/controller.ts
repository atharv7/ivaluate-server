import { JsonController, Post, Param, Get, Body, Authorized,HttpCode } from 'routing-controllers'
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

}