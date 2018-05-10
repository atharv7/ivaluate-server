import { JsonController, Post, Param,Delete, Get,Put, Body, Authorized,HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Student from './entity';


@JsonController()
export default class StudentController {
  
  @Authorized()
  @Post('/students')
  @HttpCode(201)
  async createStudent(
    @Body() { fullName, photo, batch }: Student
  ) {
    if(fullName==='') throw new BadRequestError()
    if(photo==='') photo = 'https://cdn4.iconfinder.com/data/icons/little-boy/1067/Little_Boy_White.png' //default pic
    const entity = new Student
    entity.fullName=fullName
    entity.photo=photo
    entity.batch=batch

    const student = await entity.save()

    return student
  }

  

  @Authorized()
    @Get('/students/:id([0-9]+)')
    @HttpCode(200)
    async getStudents(@Param('id') id: number) {
      return await Student.find({batch: id})
    }

    // Getting JWT malformed error because of the below authorized!! :(
    // @Authorized()    
    @Get('/getbatch/:id([0-9]+)')
    @HttpCode(200)
    async getBatch(@Param('id') id: number) {
      const student = await Student.findOne(id)
      if(!student) throw new NotFoundError
      return {student}
    }

    @Authorized()
    @Get('/students')
    
    getAllStudents() {
      return Student.find()
    }

  @Authorized()
  @Put('/students/:id')
  @HttpCode(200)
  async editStudent(@Param('id') id: number,
    @Body() { fullName, photo, batch }: Student
  ) {
    const entity = await Student.findOne(id)
    if(entity) {
    entity.fullName=(fullName)?fullName:entity.fullName
    entity.photo=(photo)?photo:entity.photo
    entity.batch=batch
    return await entity.save()
    
    } else {
      throw new NotFoundError
    }
    
  }

  @Authorized()
  @Delete('/students/:id([0-9]+)')
  async removeStudent(
    @Param('id') id: number
  ) {
    const student = await Student.findOne(id)
    if(student)
    return await student.remove()
  }

}
