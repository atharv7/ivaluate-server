import {
Authorized, BadRequestError, Body,  HttpCode, JsonController, Param,
Post
} from "routing-controllers";
import Grades from "./entity";
import Student from "../students/entity";

@JsonController()
export default class GradesController{

// @Authorized()
@Post('/students/:id([0-9]+)/grades')
@HttpCode(201)
async giveGrade(
    @Body() body: Grades,
    @Param('id') id: number
) {
    const student = await Student.findOne({id: id})
    const teacher = body.teacher
    const color = body.color
    const newDate = new Date()
    const remarks = body.remarks
    if(student) {

    const grade = await Grades.create({
        color,remarks,date: newDate,student: student.id,teacher
    }).save()

    return Grades.findOne({where: {id: grade.id}})
}  
}
}