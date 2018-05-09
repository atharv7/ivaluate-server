import { JsonController, Post, Param, Get, Body, Authorized } from 'routing-controllers'
import Student from './entity';


@JsonController()
export default class StudentController {
  
  @Authorized()
  @Post('/students')
  async createStudent(
    @Body() data: Student
  ) {
    const entity = await Student.create(data)

    const student = await entity.save()

    return { student }
  }

}
